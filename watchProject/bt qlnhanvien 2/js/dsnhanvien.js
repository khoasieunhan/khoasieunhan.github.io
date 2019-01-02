function listOfEmployee() {
    this.arrayStaff = [];
}

// Payroll for staff
listOfEmployee.prototype.showSalary = function () {
    for (var i = 0; i < this.arrayStaff.length; i++) {
        this.arrayStaff[i].payRoll();
    }
};

// Calculate the employee object entered
listOfEmployee.prototype.addEmploy = function (employ) {
    this.arrayStaff.push(employ);
};

// Remove Staff
listOfEmployee.prototype.removeEmploy = function (mangCkbDuocChon) 
{
    for (var i = 0; i < mangCkbDuocChon.length; i++) 
    {
        var taiKhoanDuocChon = mangCkbDuocChon[i];
        for (var j = 0; j < this.arrayStaff.length; j++) {
            var employ = this.arrayStaff[j];
            //    Nếu như taikhoanduocchon = nguoidung.taikhoan thì xóa
            if (taiKhoanDuocChon === employ.iD) {
                this.arrayStaff.splice(j, 1);
            }
        }
    }
};

// listOfEmployee.prototype.deleteEmploy = function(iD){
//     for(var i=0; i<this.arrayStaff; i++){
//         var employ = this.arrayStaff[i];
//         if(employ.iD === iD){
//             this.arrayStaff.splice(i, 1);
//         }
//     }
// };

// Get Information Staff
listOfEmployee.prototype.getEmploy = function (iD) {
    for (var i = 0; i < this.arrayStaff.length; i++) {
        var employ = this.arrayStaff[i];
        if (employ.iD === iD) {
            return employ;
        }
    }
};

// Edit Information Satff
listOfEmployee.prototype.editEmploy = function (id) {
    for (var i = 0; i < this.arrayStaff.length; i++) {
        var employUpdate = this.arrayStaff[i];
        if (id.iD === employUpdate.iD)
        //Look for employees in the array whose code is equal to the employee's change
        {
            // update the value of the employee in the array
            employUpdate.iD = id.iD;
            employUpdate.firstName = id.firstName;
            employUpdate.lastName = id.lastName;
            employUpdate.teleNumber = id.teleNumber;
            employUpdate.email = id.email;
            employUpdate.position = id.position;
            employUpdate.payDay = id.payDay;
            employUpdate.daysWorked = id.daysWorked;
            employUpdate.payRoll = id.payRoll;
        }
    }
};

// Fine Staff
// listOfEmployee.prototype.findStaff = function(name){
//     //Tìm kiếm theo họ tên
//     var lstKetQuaTimKiem = new listOfEmployee();
//     for(var i =0; i < this.arrayStaff.length; i++){
//         var employ = this.arrayStaff[i];
//         if(employ.firstName.toLowerCase().trim().search(name.toLowerCase().trim()) != -1){
//             lstKetQuaTimKiem.addEmploy(employ);
//         }
//     }
//     return lstKetQuaTimKiem;
// }