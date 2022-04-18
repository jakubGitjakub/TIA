namespace TodoApi.Models
{
    public class Events
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime Start_Date { get; set; }
        public DateTime End_Date { get; set; }
        public string? Status { get; set; }
        public string? Access { get; set; }
        public Boolean Verify_Status { get; set; }
        public virtual List<Companies>? Companies { get; set; }
        public virtual List<Tickets>? Tickets { get; set; }
        public virtual Users? Users { get; set; }
    }
}
