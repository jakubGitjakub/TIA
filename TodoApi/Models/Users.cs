namespace TodoApi.Models
{
    public class Users
    {
        public long Id { get; set; }
        public string? Title { get; set; }
        public string? First_Name { get; set; }
        public string? Last_Name { get; set; }
        public string? email { get; set; }
        public DateTime? Birthdate { get; set; }
        public string? Phone_Number { get; set; }
        public string? Image_Path { get; set; }
        public string? Note { get; set; }
        public string Role { get; set; }
        public string Login { get; set; } = string.Empty;
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public Boolean Verify_Status { get; set; }
        public virtual List<LoginHistory>? LoginHistory { get; set; }
        public virtual List<ShopingHistory>? ShopingHistory { get; set; }
        public virtual List<Events>? Events { get; set; }
        public virtual Addresses? Id_Addresses { get; set; }

    }
}
