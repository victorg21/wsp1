class Person {
    constructor(name, id, dateOfBirth, telphone) {
        this.name = name;
        this.id = id;
        this.dateOfBirth = dateOfBirth;
        this.telphone = telphone;
    }
}

class Customer extends Person{
    //constructor(name, id, dateOfBirth, telphone){
    //    super(name, id, dateOfBirth, telphone);
   // }
    constructor(person) {
        super(person.name, person.id, person.dateOfBirth, person.telphone);
    }
}

class Account {
    constructor(customer, accountId, balance) {
        this.customer = customer;
        this.accountId = accountId;
        this.balance = balance;
        this.currency = "Shkel";
    }
}

class ForeignCurrencyAccount extends Account {
    constructor(customer, accountId, balance, currency){
        super(customer, accountId, balance);
        this.currency = currency;
    }
}

class MorgageAccount extends Account {
    constructor(customer, accountId, balance, monthlyAmount, interest, period){
        super(customer, accountId, balance);
        this.monthlyAmount = monthlyAmount;
        this.interest = interest;
        this.period = period;
    }
}

class SavingAccount extends Account {
    constructor(customer, accountId, balance, monthlyAmount, interest){
        super(customer, accountId, balance);
        this.monthlyAmount = monthlyAmount;
        this.interest = interest;
    }
}

class Bank {
    constructor(){
        let person1 = new Person("name1", 100, "01/01/2000", 100);
        let person2 = new Person("name2", 200, "01/01/2000", 200);
        this.customers = [];
        this.customers.push(new Customer(person1));
        this.customers.push(new Customer(person2));

        this.accounts = [];
        this.accounts.push(new SavingAccount(this.customers[0], 501, 300, 1000, 2.5));
        this.accounts.push(new MorgageAccount(this.customers[0], 502, -200, 1000, 5, 100));
        this.accounts.push(new SavingAccount(this.customers[1], 601, 300, 1000, 2.5));
        this.accounts.push(new ForeignCurrencyAccount(this.customers[1], 602, 200, "dollar"));
    }

    printCustomers(){
        //Pass over customer
        for(var key in this.customers){
            let custId = this.customers[key].id;
            let custName = this.customers[key].name;

            //Pass over accounts
            let totalBalance = 0;
            for(var key in this.accounts){
                let accoCustId = this.accounts[key].customerId;
                if(custId === accoCustId){
                    totalBalance += this.accounts[key].balance;
                }
            }
            document.write("totalBalance for " +custName +" is " +totalBalance +"</br>");
        }
    }
}

