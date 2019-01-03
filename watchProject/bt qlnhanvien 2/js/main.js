var ThongBao_HO = "Please Input Last Name";
var ThongBao_TEN = "Please Input First Name";
var ThongBao_CHUCVU = "Please Input Position";
var ThongBao_MSNV = "Please Input ID";
var ThongBao_NGAY = "Please Input Days Worked";
var ThongBao_NGAYLAM = "Please Choose Workday"
var ThongBao_soLuong = "Please Input Pay Day";
var ThongBaoNhapChieuDai = "Please enter the correct format ID";
var ThongBaoNhapChieuDai_Name = "Please enter the correct format Name";
var ThongBaoNhapChieuDai_Last = "Please enter the correct format Last Name";
var ThongBao_soDienThoai = "Please Input TelePhone";
var ThongBao_HOPLEEMAIL = "Please enter a valid email address.\nExample@gmail.com";
var ThongBao_HOPLEPHONE = "Please enter a valid Phone Number";
var ThongBao_NHAPEMAIL = "Pleas Enter Your Email";

function getMyEle(ele) {
    return document.getElementById(ele);
}

function getMyClass(ele) {
    return document.getElementsByClassName(ele);
}

getMyEle('btnModall').addEventListener("click", function () {
    var modalHeader = `Add Employee`;
    var modalFooter = `
        <button class="btn btn-success" onclick="btnAdd()">Add</button>
        <button id="btnClose" class="btn btn-danger">Close</button>
    `;
    getMyClass("modal-title")[0].innerHTML = modalHeader;
    getMyClass("modal-footer")[0].innerHTML = modalFooter;
    getMyEle('btnModal').click();
    getMyEle("idbody").removeAttribute("readonly");
    clearEmploy();
});

$("body").delegate("#btnClose", "click", function () {
    $(".close").trigger("click");
});

// getMyEle('btnAdd').addEventListener("click", AddEmploy);

var listStaff = new listOfEmployee();

function btnAdd() {
    var kq1 = checkInput();
    var kq2 = CheckLength('idbody', 'tbID', 5, 10, ThongBaoNhapChieuDai);
    var kq3 = checkEmail();
    var kq4 = validatePhone();
    if (kq1 && kq2 && kq3 && kq4) {
        var iD = getMyEle('idbody').value;
        var FirstName = getMyEle('firstName').value;
        var LastName = getMyEle('lastName').value;
        var TelePhone = getMyEle('telePhone').value;
        var Email = getMyEle('email').value;
        var Position = getMyEle('position').value;
        var PayDay = getMyEle('payDay').value;
        var DaysWorked = getMyEle('daysWorked').value;
        var employ = new Employ(iD, FirstName, LastName, TelePhone, Email, Position, PayDay, DaysWorked);
        listStaff.addEmploy(employ);
        loadEmploy(listStaff.arrayStaff);
        saveStorage();
        clearEmploy();
        $("#btnModal").trigger("click");
        $(".close").trigger("click");
    }
}

function loadEmploy(arrayStaff) {
    var tableEmploy = "";
    for (var i = 0; i < arrayStaff.length; i++) {
        var employ = arrayStaff[i];
        tableEmploy += `
            <tr style="color:orange;" class="trInforStaff">
                <td><input type="checkbox" class="btnRemoveStaff" value="${employ.iD}"></td>
                <td>${employ.iD}</td>
                <td id="tukhoa">${employ.firstName}</td>
                <td>${employ.lastName}</td>
                <td>${employ.teleNumber}</td>
                <td>${employ.email}</td>
                <td>${employ.position}</td>
                <td>${Number(employ.payDay).toLocaleString()}</td>
                <td>${employ.daysWorked}</td>
                <td>${Number(employ.payRoll).toLocaleString()}</td>
                <td>
                    <button class="btn btn-success" manv='${employ.iD}' onclick="btnEditStaff('${employ.iD}')">Edit</button>
                </td>
            </tr>
        `;
    }
    getMyEle("myTable-body").innerHTML = tableEmploy;
}

function toggle(oInput) {
    var aInputs = document.getElementsByTagName('input');
    for (var i = 0; i < aInputs.length; i++) {
        if (aInputs[i] != oInput) {
            aInputs[i].checked = oInput.checked;
        }
    }
}

getMyEle('remove--button').addEventListener("click", function () {
    var mangCkbDuocChon = [];
    var mangCkbXoa = getMyClass("btnRemoveStaff");
    for (var i = 0; i < mangCkbXoa.length; i++) {
        var ckb = mangCkbXoa[i];
        if (ckb.checked === true) {
            mangCkbDuocChon.push(ckb.value);
        }
        listStaff.removeEmploy(mangCkbDuocChon);
    }
    loadEmploy(listStaff.arrayStaff);
    saveStorage();
});

function btnEditStaff(employ) {
    var employee = listStaff.getEmploy(employ);
    var modalHeader = `Update Employee`;
    var modalFooter =
        `<button manv='${employ.iD}' onclick="btnSave('${employ.iD}')" class="btn btn-success">Save</button>
        <button id="btnClose" class="btn btn-danger">Close</button>`;

    $("#btnModal").trigger("click");

    getMyEle("idbody").setAttribute("readonly", true);

    getMyClass("modal-title")[0].innerHTML = modalHeader;
    getMyClass("modal-footer")[0].innerHTML = modalFooter;
    // getMyEle('btnModal').click();

    getMyEle('idbody').value = employee.iD;
    getMyEle('firstName').value = employee.firstName;
    getMyEle('lastName').value = employee.lastName;
    getMyEle('telePhone').value = employee.teleNumber;
    getMyEle('email').value = employee.email;
    getMyEle('position').value = employee.position;
    getMyEle('payDay').value = employee.payDay;
    getMyEle('daysWorked').value = employee.daysWorked;

}

function btnSave() {
    var iD = getMyEle('idbody').value;
    var FirstName = getMyEle('firstName').value;
    var LastName = getMyEle('lastName').value;
    var TelePhone = getMyEle('telePhone').value;
    var Email = getMyEle('email').value;
    var Position = getMyEle('position').value;
    var PayDay = getMyEle('payDay').value;
    var DaysWorked = getMyEle('daysWorked').value;
    var employ = new Employ(iD, FirstName, LastName, TelePhone, Email, Position, PayDay, DaysWorked);
    listStaff.editEmploy(employ);
    $(".close").trigger("click");
    getMyEle("idbody").removeAttribute("readonly");
    saveStorage();
    clearEmploy();
    loadEmploy(listStaff.arrayStaff);
}

function clearEmploy() {
    getMyEle('idbody').value = "";
    getMyEle('firstName').value = "";
    getMyEle('lastName').value = "";
    getMyEle('telePhone').value = "";
    getMyEle('email').value = "";
    getMyEle('position').value = "";
    getMyEle('payDay').value = "";
    getMyEle('daysWorked').value = "";
}

function saveStorage() {
    //B1 chuyển mảng object thành chuỗi string
    var chuoiNV = JSON.stringify(listStaff.arrayStaff);
    //B2 lưu vào storage
    localStorage.setItem("listStaff", chuoiNV);
}

// Lây giá trị từ storage ra table
getMyEle('btnStorage').addEventListener('click', getStorage);

function getStorage() {
    // Lấy chuỗi từ storage ra object
    // trước khi lấy phải kiểm tra nó có giá trị hay chưa
    if (localStorage.getItem("listStaff")) {
        // chuyển từ chuỗi sang object Nhan vIên
        var mangNV = JSON.parse(localStorage.getItem("listStaff"));
        // Đổ dữ liệu vào mảng dsNhanVien
        listStaff.arrayStaff = mangNV;
        // Load dữ liệu ra table
        loadEmploy(listStaff.arrayStaff);
    }
}

function mySweet() {
    swal({
        title: 'Hi Guy',
        text: 'Welcome To....',
        width: 600,
        padding: '3em',
        background: 'rgba(0, 123, 255, 0) url(./img/856IQ.png)',
        animation: false,
        customClass: 'wow rollIn',
        backdrop: `
          rgba(0,0,123,0.4)
          url("./img/hello_zidler_dribbble.gif")
          center left
          no-repeat
        `
    })
}

function inputError(id, tb, noticeChain) {
    var kq = true;
    var InputFocus = getMyEle(id);
    var Input = getMyEle(id).value;
    var tbInput = getMyEle(tb);
    if (Input === "") {
        tbInput.innerHTML = noticeChain;
        InputFocus.focus();
        // getMyClass('modal-content').click("btnAdd");
        kq = false;
    } else {
        tbInput.innerHTML = "";
        kq = true;
    }
    return kq;
}

function checkThePosition() {
    var kq = true;
    var positionFocus = getMyEle('position');
    var position = getMyEle('position').value;
    var tbPosition = getMyEle('tbChucVu');
    if (position.selectedIndex == 0) {
        tbPosition.innerHTML = ThongBao_CHUCVU;
        positionFocus.focus;
        kq = false;
    } else {
        tbPosition.innerHTML = "";
        kq = true;
    }
    return kq;
}

function checkInput() {
    var kq = true;
    var kq1 = inputError('idbody', 'tbID', ThongBao_MSNV);
    var kq2 = inputError('firstName', 'tbFirstName', ThongBao_TEN);
    var kq3 = inputError('lastName', 'tbLastName', ThongBao_HO);
    var kq4 = inputError('telePhone', 'tbTeleNumber', ThongBao_soDienThoai);
    var kq5 = inputError('email', 'tbEmail', ThongBao_NHAPEMAIL);
    var kq6 = checkThePosition();
    var kq7 = inputError('payDay', 'tbPayDay', ThongBao_NGAY);
    var kq8 = inputError('daysWorked', 'tbDaysWorked', ThongBao_soLuong);
    // var kq7 = checkEmail();
    // var kq8 = validatePhone();
    if (kq1 && kq2 && kq3 && kq4 && kq5 && kq6 && kq7 && kq8) {
        kq = true;
    } else {
        kp1.focus();
        kp2.focus();
        kp3.focus();
        kp4.focus();
        kp5.focus();
        kp6.focus();
        kp7.focus();
        kp8.focus();
        kq = false;
    }
    return kq;
}

function CheckLength(id, idTB, min, max) {
    var kq = true;
    var input = getMyEle(id).value;
    var thongBao = getMyEle(idTB);
    if (input.length < min || input.length > max) {
        thongBao.innerHTML = ThongBaoNhapChieuDai + min + "-->" + max;
        kq = false;
    } else {
        thongBao.innerHTML = "";
        kq = true;
    }
    return kq;
}

function checkEmail() {
    var kq = true;
    var email = getMyEle('email');
    var tbEmail = getMyEle('tbEmail');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
        tbEmail.innerHTML = ThongBao_HOPLEEMAIL;
        email.focus();
        kq = false;
    } else {
        tbEmail.innerHTML = "";
        kq = true;
    }
    return kq;
}
// alert('Hay nhap dia chi email hop le.\nExample@gmail.com');

function validatePhone() {
    var phoneFocus = getMyEle("telePhone");
    var phone = getMyEle("telePhone").value;
    var tbPhone = getMyEle('tbTeleNumber');
    var filter = phone.replace(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
    if (filter.length > 6 && filter.length < 12) {
        tbPhone.innerHTML = "";
        return true;
    } else {
        tbPhone.innerHTML = ThongBao_HOPLEPHONE;
        phoneFocus.focus();
        return false;
    }
}

// function validateForm(id) {
//     var form = getMyEle(id).value;
//     if (form === "") {
//         var modal = getMyEle('myModal--modal');
//         if (modal) {
//             modal.style.display = "block";
//             return false;
//         }
//     }
// }