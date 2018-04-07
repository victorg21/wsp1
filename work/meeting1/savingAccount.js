class SavingAccount extends Account {
    Constructor(customerId, accountId, balance, monthlyAmount, interest){
        this.super(customerId, accountId, balance);
        this.monthlyAmount = monthlyAmount;
        this.interest = interest;
    }
}