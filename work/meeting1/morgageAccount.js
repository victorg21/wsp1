class MorgageAccount extends Account {
    Constructor(customerId, accountId, balance, monthlyAmount, interest, periodInMonth){
        this.super(customerId, accountId, balance);
        this.monthlyAmount = monthlyAmount;
        this.interest = interest;
        this.periodInMonths = periodInMonths;
    }
}