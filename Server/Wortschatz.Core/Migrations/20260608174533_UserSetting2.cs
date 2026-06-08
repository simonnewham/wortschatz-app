using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wortschatz.Core.Migrations
{
    /// <inheritdoc />
    public partial class UserSetting2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "UserSettings");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "UserSettings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "UserSettings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "UserSettings",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
