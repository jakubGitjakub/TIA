namespace TodoApi.Models
{
    public class TicketsEvents
    {
        public long Id { get; set; }
        public int Ticket { get; set; }
        public Tickets Tickets { get; set; }
        public int Event { get; set; }
        public Events Events { get; set; }
    }
}
