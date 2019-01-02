
/*
	Muc dich: File nay quan ly tat ca js chinh
	Nguoi tao: xxx
	Ngay tao: 03-07-2018
	Version: 1.0
 */

var GIA_KHOI_DIEM_UBERX = 8000;
var GIA_MUC_1_UBERX = 12000;
var GIA_MUC_2_UBERX = 10000;

var GIA_KHOI_DIEM_UBERSUV = 9000;
var GIA_MUC_1_UBERSUV = 14000;
var GIA_MUC_2_UBERSUV = 12000;

var GIA_KHOI_DIEM_UBERBLACK = 10000;
var GIA_MUC_1_UBERBLACK = 16000;
var GIA_MUC_2_UBERBLACK = 14000;

var GIA_TIEN_CHO_UBERX = 2000;
var GIA_TIEN_CHO_UBERSUV = 3000;
var GIA_TIEN_CHO_UBERBLACK = 4000;
var TIEN_TE = " vnd"; 

/*
 Tao ham helper ho tro get element
 */

function getMyEle(ele) {
	return document.getElementById(ele);
}

/*
	fdafdsf
	fasd
	fd
	fd
 */
function TienTheoUber(soKM, gia1, gia2, gia3) {
	var thanhTien = 0; 
	if(soKM <=1){
		 thanhTien = gia1;
	} else if(soKM>1 && soKM <= 20){
		 thanhTien = gia1 + (soKM - 1) * gia2;	
	} else if(soKM>20){
		thanhTien = gia1 +  19* gia2 + (soKM - 20)* gia3;
	}
	return thanhTien;
}

function TinhTienCho(giaCho, thoiGianCho) {
	var tienCho = 0; 
	if(thoiGianCho>=3){
		tienCho = Math.round(thoiGianCho/3)*giaCho; 
	}
	return tienCho;

}


/*
	Muc dich: Tinh tong tien tu cac du lieu nguio dung nhap vao
	Nguoi tao : xxx
	Ngay tao: xxx
	ver: 1.0

 */
function TinhTien() {
	var uberX = document.getElementById('uberX');
	var uberSUV = document.getElementById('uberSUV');
	var uberBlack = document.getElementById('uberBlack');

	var divThanhTien = document.getElementById('divThanhTien');
	divThanhTien.style.display = "block";

	var soKM = document.getElementById('soKM').value; 
	soKM = parseFloat(soKM); // chuyen chuoi so thuc thanh so thuc
	var thoiGianCho = document.getElementById('thoiGianCho').value;
	thoiGianCho = parseInt(thoiGianCho); 

	var xuatTien = document.getElementById('xuatTien');

	var thanhTien = 0;
	if(uberX.checked) {

		thanhTien = TienTheoUber(soKM, GIA_KHOI_DIEM_UBERX, 
									GIA_MUC_1_UBERX, GIA_MUC_2_UBERX);
		
		var tienCho = TinhTienCho(GIA_TIEN_CHO_UBERX);
		thanhTien +=tienCho; 
		 xuatTien.innerHTML = thanhTien + TIEN_TE;

	} else if (uberSUV.checked){
		thanhTien = TienTheoUber(soKM, GIA_KHOI_DIEM_UBERSUV, 
									GIA_MUC_1_UBERSUV, GIA_MUC_2_UBERSUV);
		xuatTien.innerHTML = thanhTien + TIEN_TE;
	} else if (uberBlack.checked){
		thanhTien = TienTheoUber(soKM, GIA_KHOI_DIEM_UBERBLACK, 
									GIA_MUC_1_UBERBLACK, GIA_MUC_2_UBERBLACK);
		xuatTien.innerHTML = thanhTien + TIEN_TE;
	} else{
		alert("Vui long chonj loai uber");
		divThanhTien.style.display = "none";
	}
}

/*
	Muc dich: Tao cac dong du lieu cho table chi tiet
	Tham so: 
		- tbody:
		-
		-
		-
		- flag: Neu flag == true: tao cho sokm di duoc, nguoc lai: tinh cho cho
	Nguoi tao:
	Ngay tao:
	Version: 
 */
function TaoDong(tbody, chuoi, soLuong, donGia, flag) {
	var row = document.createElement('tr');
	tbody.appendChild(row);
	
	var td = document.createElement('td');
	row.appendChild(td);
	td.innerHTML = chuoi;

	td = document.createElement('td');
	row.appendChild(td);
	td.innerHTML = soLuong;

	 td = document.createElement('td');
	row.appendChild(td);
	td.innerHTML = donGia;

	td = document.createElement('td');
	if(flag){
	 td.innerHTML = donGia*soLuong;
	} else {
	 td.innerHTML = TinhTienCho(donGia, soLuong);
	}
	row.appendChild(td);
	

}

function InHoaDon() {
	var divChiTiet = getMyEle('divChiTiet');
	divChiTiet.style.display = "block";

	var tableBody = getMyEle('tableBody');

	tableBody.innerHTML = '';

	var uberX = getMyEle('uberX');
	var uberSUV = getMyEle('uberSUV');
	var uberBlack = getMyEle('uberBlack');


	var soKM = getMyEle('soKM').value; 
	soKM = parseFloat(soKM); // chuyen chuoi so thuc thanh so thuc
	var thoiGianCho = getMyEle('thoiGianCho').value;
	thoiGianCho = parseInt(thoiGianCho); 

	
	var thanhTien = 0;
	if(uberX.checked) {
		if(soKM <=1){
			TaoDong(tableBody,"Mo cua/1KM dau tien",1, GIA_KHOI_DIEM_UBERX, true);
			TaoDong(tableBody,"Thoi Gian Cho",thoiGianCho, GIA_TIEN_CHO_UBERX, false);
		} else if(soKM > 1 && soKM < 20){
			TaoDong(tableBody,"Mo cua/1KM dau tien",1, GIA_KHOI_DIEM_UBERX, true);
			TaoDong(tableBody,"Km tu 1 den 20",soKM -1 , GIA_MUC_1_UBERX, true);
			TaoDong(tableBody,"Thoi Gian Cho",thoiGianCho, GIA_TIEN_CHO_UBERX,false);
		} else {
			TaoDong(tableBody,"Mo cua/1KM dau tien",1, GIA_KHOI_DIEM_UBERX, true);
			TaoDong(tableBody,"Km tu 1 den 20",19 , GIA_MUC_1_UBERX, true);
			TaoDong(tableBody,"Tu 20 KM tro di",soKM -20 , GIA_MUC_2_UBERX,true);
			TaoDong(tableBody,"Thoi Gian Cho",thoiGianCho, GIA_TIEN_CHO_UBERX,false);
		}

	} else if (uberSUV.checked){
		
	} else if (uberBlack.checked){
		
	} else{
		alert("Vui long chonj loai uber");
		divThanhTien.style.display = "none";
	}

}


