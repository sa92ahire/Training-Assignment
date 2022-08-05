namespace backend.Model
{
    public class Loan
    {
        public int LoanId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PropertyAddress { get; set; }
        public User User { get; set; }
    }
}