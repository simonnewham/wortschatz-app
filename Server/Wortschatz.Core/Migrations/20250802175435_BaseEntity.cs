using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wortschatz.Core.Migrations
{
    /// <inheritdoc />
    public partial class BaseEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WordTag_Tag_TagId",
                table: "WordTag");

            migrationBuilder.DropForeignKey(
                name: "FK_WordTag_Words_WordId",
                table: "WordTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WordTag",
                table: "WordTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tag",
                table: "Tag");

            migrationBuilder.DropColumn(
                name: "NativeWordGender",
                table: "Words");

            migrationBuilder.DropColumn(
                name: "TranslateWordGender",
                table: "Words");

            migrationBuilder.RenameTable(
                name: "WordTag",
                newName: "WordTags");

            migrationBuilder.RenameTable(
                name: "Tag",
                newName: "Tags");

            migrationBuilder.RenameIndex(
                name: "IX_WordTag_WordId",
                table: "WordTags",
                newName: "IX_WordTags_WordId");

            migrationBuilder.RenameIndex(
                name: "IX_WordTag_TagId",
                table: "WordTags",
                newName: "IX_WordTags_TagId");

            migrationBuilder.AlterColumn<int>(
                name: "WordType",
                table: "Words",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Artikel",
                table: "Words",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_WordTags",
                table: "WordTags",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tags",
                table: "Tags",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WordTags_Tags_TagId",
                table: "WordTags",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WordTags_Words_WordId",
                table: "WordTags",
                column: "WordId",
                principalTable: "Words",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WordTags_Tags_TagId",
                table: "WordTags");

            migrationBuilder.DropForeignKey(
                name: "FK_WordTags_Words_WordId",
                table: "WordTags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WordTags",
                table: "WordTags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tags",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "Artikel",
                table: "Words");

            migrationBuilder.RenameTable(
                name: "WordTags",
                newName: "WordTag");

            migrationBuilder.RenameTable(
                name: "Tags",
                newName: "Tag");

            migrationBuilder.RenameIndex(
                name: "IX_WordTags_WordId",
                table: "WordTag",
                newName: "IX_WordTag_WordId");

            migrationBuilder.RenameIndex(
                name: "IX_WordTags_TagId",
                table: "WordTag",
                newName: "IX_WordTag_TagId");

            migrationBuilder.AlterColumn<int>(
                name: "WordType",
                table: "Words",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NativeWordGender",
                table: "Words",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TranslateWordGender",
                table: "Words",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_WordTag",
                table: "WordTag",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tag",
                table: "Tag",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WordTag_Tag_TagId",
                table: "WordTag",
                column: "TagId",
                principalTable: "Tag",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WordTag_Words_WordId",
                table: "WordTag",
                column: "WordId",
                principalTable: "Words",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
