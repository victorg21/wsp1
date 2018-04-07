class Customer extends Person{
    Constructor(name, id, dateOfBirth, telphone){
        this.super(name, id, dateOfBirth, telphone);
        this.accountId;
    }
    Constructor(person) {
        this.super(person.name, person.id, person.dateOfBirth, person.telphone);
        this.accountId;
    }
}