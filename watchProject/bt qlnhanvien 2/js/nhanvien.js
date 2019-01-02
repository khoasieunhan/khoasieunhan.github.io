function Employ (iD, firstName, lastName, teleNumber, email, position, payDay, daysWorked, totalSalary){
    this.iD = iD;
    this.firstName = firstName;
    this.lastName = lastName;
    this.teleNumber = teleNumber;
    this.email = email;
    this.position = position;
    this.payDay = payDay;
    this.daysWorked = daysWorked;
    this.totalSalary = totalSalary;
    this.arrayAttribute = [this.iD, this.firstName, this.lastName, this.teleNumber, this.email, this.position, this.payDay, this.daysWorked, this.totalSalary];
    this.payRoll = this.payDay * this.daysWorked;
}