# Đặt dung lượng tối thiểu mặc định (đơn vị MB)
param (
    [int]$MinSizeMB = 100
)

# Xác định đường dẫn hiện tại của file script (.ps1)
$ScriptDirectory = Split-Path -Parent $PSCommandPath
$OutputCsvPath = Join-Path $ScriptDirectory "ListLargeFiles.csv"

# Chuyển đổi dung lượng tối thiểu sang byte
$MinSizeBytes = $MinSizeMB * 1MB

# Liệt kê tất cả các tập tin và hiển thị thanh trạng thái
Write-Host "Scanning file... Please wait." -ForegroundColor Yellow

# Lấy danh sách các file lớn hơn dung lượng tối thiểu
$files = Get-ChildItem -Path "C:\" -Recurse -File -ErrorAction SilentlyContinue

$totalFiles = $files.Count
$currentFile = 0

foreach ($file in $files) {
    $currentFile++
    Write-Progress -Activity "Checking..." -Status " $currentFile/$totalFiles" -PercentComplete (($currentFile / $totalFiles) * 100)

    # Lọc file theo dung lượng
    if ($file.Length -ge $MinSizeBytes) {
        $FilteredFiles += $file
    }
}

# Xuất danh sách các tập tin vào file CSV
$FilteredFiles | Select-Object FullName, Length | Export-Csv -Path $OutputCsvPath -NoTypeInformation -Encoding UTF8

Write-Host "List of file greater than $MinSizeMB MB have been saved to $OutputCsvPath"

Read-Host