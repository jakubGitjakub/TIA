namespace TodoApi.Models
{
    public class EventCalendar
    {
        public long Id { get; set; }
        public DateTime? Date { get; set; }
        public double Capacity { get; set; }
        public string Days { get; set; }
        public string Time { get; set; }
        public virtual List<Tickets> Tickets { get; set; }

    }
}
