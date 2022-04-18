namespace TodoApi.Models
{
    public class EventCalendar
    {
        public long Id { get; set; }
        public DateTime? StartDate { get; set; }
        public double? Capacity { get; set; }
        public DateTime? EndDate { get; set; }
        public string? text { get; set; }
        public bool? allDay { get; set; }
        public virtual Companies? Company { get; set; }
        public virtual Events? Events { get; set; }
        public virtual Tickets? Tickets { get; set; }

    }
}
