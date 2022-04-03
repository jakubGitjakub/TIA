using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using TodoApi.Models;

namespace TodoApi.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder mb)
        {

            var cascadeFKs = mb.Model.GetEntityTypes()
                .SelectMany(t => t.GetForeignKeys())
                .Where(fk => !fk.IsOwnership && fk.DeleteBehavior.IsIn(DeleteBehavior.Cascade, DeleteBehavior.ClientSetNull));
            foreach (var fk in cascadeFKs)
                fk.DeleteBehavior = DeleteBehavior.Restrict;
        }

        public DbSet<TodoApi.Models.Users> Users { get; set; }

        public DbSet<TodoApi.Models.Companies> Companies { get; set; }

        public DbSet<TodoApi.Models.Events> Events { get; set; }

        public DbSet<TodoApi.Models.Tickets> Tickets { get; set; }

        public DbSet<TodoApi.Models.EventCalendar> EventCalendar { get; set; }

        public DbSet<TodoApi.Models.Addresses> Addresses { get; set; }

        public DbSet<TodoApi.Models.LoginHistory> LoginHistory { get; set; }

        public DbSet<TodoApi.Models.ShopingHistory> ShopingHistory { get; set; }
    }

    public static class Extensions
    {
        public static bool IsIn<T>(this T source, params T[] values) where T : struct
        {
            return values.Contains(source);
        }
    }
}
