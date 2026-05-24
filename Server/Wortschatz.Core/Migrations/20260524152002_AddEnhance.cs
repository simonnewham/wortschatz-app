using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wortschatz.Core.Migrations
{
    /// <inheritdoc />
    public partial class AddEnhance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EnhanceResult",
                table: "Words",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnhanceResult",
                table: "Words");
        }
    }
}
