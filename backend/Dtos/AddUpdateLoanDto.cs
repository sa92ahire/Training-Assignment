namespace backend.Dtos
{
    public class AddUpdateLoanDto
    {
        public int LoanId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PropertyAddress { get; set; }
        public int UserId { get; set; }
    }
}