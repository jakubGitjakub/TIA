namespace TodoApi.Models
{
    public class EventCalendar
    {
        public long Id { get; set; }
        public DateTime Start_Date { get; set; }
        public double Capacity { get; set; }
        public DateTime End_Date { get; set; }
        public string Time { get; set; }
        public virtual List<Tickets> Tickets { get; set; }
        public virtual Companies Company { get; set; }
        public virtual Events Event { get; set; }

    }
}
