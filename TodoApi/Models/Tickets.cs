namespace TodoApi.Models
{
    public class Tickets
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime Start_Date { get; set; }
        public DateTime End_Date { get; set; }
        public string? Capacity { get; set; }
        public string? Additional_Info { get; set; }
        public string? Status { get; set; }
        public virtual List<Events>? Events { get; set; }
        public virtual Users? User { get; set; }

    }
}
