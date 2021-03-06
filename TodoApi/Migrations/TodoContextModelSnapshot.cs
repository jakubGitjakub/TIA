// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TodoApi.Models;

#nullable disable

namespace TodoApi.Migrations
{
    [DbContext(typeof(TodoContext))]
    partial class TodoContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("CompaniesEvents", b =>
                {
                    b.Property<long>("CompaniesId")
                        .HasColumnType("bigint");

                    b.Property<long>("EventsId")
                        .HasColumnType("bigint");

                    b.HasKey("CompaniesId", "EventsId");

                    b.HasIndex("EventsId");

                    b.ToTable("CompaniesEvents");
                });

            modelBuilder.Entity("EventsTickets", b =>
                {
                    b.Property<long>("EventsId")
                        .HasColumnType("bigint");

                    b.Property<long>("TicketsId")
                        .HasColumnType("bigint");

                    b.HasKey("EventsId", "TicketsId");

                    b.HasIndex("TicketsId");

                    b.ToTable("EventsTickets");
                });

            modelBuilder.Entity("TodoApi.Models.Addresses", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("CompaniesId")
                        .HasColumnType("bigint");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("House_Number")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Street")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Zip_Code")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CompaniesId");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("TodoApi.Models.Companies", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("TodoApi.Models.EventCalendar", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<double?>("Capacity")
                        .HasColumnType("float");

                    b.Property<long?>("CompanyId")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<long?>("EventsId")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<long?>("TicketsId")
                        .HasColumnType("bigint");

                    b.Property<bool?>("allDay")
                        .HasColumnType("bit");

                    b.Property<string>("text")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("EventsId");

                    b.HasIndex("TicketsId");

                    b.ToTable("EventCalendar");
                });

            modelBuilder.Entity("TodoApi.Models.Events", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("Access")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("End_Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Start_Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("UsersId")
                        .HasColumnType("bigint");

                    b.Property<bool>("Verify_Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("UsersId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("TodoApi.Models.LoginHistory", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<long>("UsersId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("UsersId");

                    b.ToTable("LoginHistory");
                });

            modelBuilder.Entity("TodoApi.Models.ShopingHistory", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<int?>("Count_Ticket")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Ticket")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("ShopingHistory");
                });

            modelBuilder.Entity("TodoApi.Models.Tickets", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("Additional_Info")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Capacity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("End_Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Start_Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("TodoApi.Models.Users", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<DateTime?>("Birthdate")
                        .HasColumnType("datetime2");

                    b.Property<string>("First_Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("Id_AddressesId")
                        .HasColumnType("bigint");

                    b.Property<string>("Image_Path")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Last_Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Phone_Number")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Verify_Status")
                        .HasColumnType("bit");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Id_AddressesId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CompaniesEvents", b =>
                {
                    b.HasOne("TodoApi.Models.Companies", null)
                        .WithMany()
                        .HasForeignKey("CompaniesId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("TodoApi.Models.Events", null)
                        .WithMany()
                        .HasForeignKey("EventsId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("EventsTickets", b =>
                {
                    b.HasOne("TodoApi.Models.Events", null)
                        .WithMany()
                        .HasForeignKey("EventsId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("TodoApi.Models.Tickets", null)
                        .WithMany()
                        .HasForeignKey("TicketsId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("TodoApi.Models.Addresses", b =>
                {
                    b.HasOne("TodoApi.Models.Companies", null)
                        .WithMany("Addresses")
                        .HasForeignKey("CompaniesId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("TodoApi.Models.EventCalendar", b =>
                {
                    b.HasOne("TodoApi.Models.Companies", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("TodoApi.Models.Events", "Events")
                        .WithMany()
                        .HasForeignKey("EventsId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("TodoApi.Models.Tickets", "Tickets")
                        .WithMany()
                        .HasForeignKey("TicketsId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Company");

                    b.Navigation("Events");

                    b.Navigation("Tickets");
                });

            modelBuilder.Entity("TodoApi.Models.Events", b =>
                {
                    b.HasOne("TodoApi.Models.Users", "Users")
                        .WithMany("Events")
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Users");
                });

            modelBuilder.Entity("TodoApi.Models.LoginHistory", b =>
                {
                    b.HasOne("TodoApi.Models.Users", "Users")
                        .WithMany("LoginHistory")
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Users");
                });

            modelBuilder.Entity("TodoApi.Models.ShopingHistory", b =>
                {
                    b.HasOne("TodoApi.Models.Users", "User")
                        .WithMany("ShopingHistory")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("User");
                });

            modelBuilder.Entity("TodoApi.Models.Tickets", b =>
                {
                    b.HasOne("TodoApi.Models.Users", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("User");
                });

            modelBuilder.Entity("TodoApi.Models.Users", b =>
                {
                    b.HasOne("TodoApi.Models.Addresses", "Id_Addresses")
                        .WithMany()
                        .HasForeignKey("Id_AddressesId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Id_Addresses");
                });

            modelBuilder.Entity("TodoApi.Models.Companies", b =>
                {
                    b.Navigation("Addresses");
                });

            modelBuilder.Entity("TodoApi.Models.Users", b =>
                {
                    b.Navigation("Events");

                    b.Navigation("LoginHistory");

                    b.Navigation("ShopingHistory");
                });
#pragma warning restore 612, 618
        }
    }
}
