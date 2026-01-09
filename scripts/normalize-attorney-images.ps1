# Attorney Image Normalization Script
# Migrates from optimized/ to Attorneys/ with ID-based filenames

$ErrorActionPreference = "Stop"

# Mapping: Attorney Name -> Optimized Filename -> Attorney ID
$nameToOptimized = @{
    'Anna Marvin' = 'anna-marvin-attorney-thmb-jpg'
    'Beau Browning' = 'beau-browning-headshot-with-background-s13-0338-a-jpg'
    'Blair R. Vandivier' = 'blair-vandivier-attorney-indianapolis-riley-bennett-egloff-business-law-mergers-and-acquisitions-contracts-formation'
    'Courtney David Mills' = 'courtney-d-mills-indianapolis-attorney-riley-bennett-egloff-partner-medical-malpractice-defense-health-care-litigation'
    'Donald S. Smith' = 'donald-s-smith-attorney-indianapolis-partner-riley-bennett-egloff-employment-law-'
    'K. Douglas Cook' = 'doug-cook-indianapolis-attorney-business-law'
    'Eric M. Hylton' = 'eric-hylton-indiana-attorney-education-law-thumbnail-1'
    'Jaclyn M. Flint' = 'jaclyn-m-flint-attorney-indiana-ip-law-construction-sports-entertainment-commercial-litigation-thumbnail'
    'James W. Riley Jr.' = 'james-riley-jr-attorney-indianapolis-riley-bennett-egloff-member-american-arbitration-association-business-litigation'
    'Jeffrey B. Fecht' = 'jeffrey-fecht-attorney-indianapolis-commercial-litigation-construction-law-product-liability-toxic-tort'
    'John L. Egloff' = 'john-egloff-attorney-headshot-thumbnail-jpg'
    'J.T. Wynne' = 'jt-wynne-headshot-indianapolis-attorney'
    'Justin O. Sorrell' = 'justin-sorrell-indiana-business-litigation-attorney'
    'Kathleen Hart' = 'kathleen-hart-indianapolis-attorney-riley-bennett-egloff-business-law-xbe-commercial-law-employment-law-'
    'Katie R. Osborne' = 'katie-osborne-indiana-med-mal-defense-attorney-partner-riley-bennett-egloff-thumbnail'
    'Katie S. Riles' = 'katie-riles-attorney-riley-bennett-egloff-with-bkgrnd-png'
    'Kevin N. Tharp' = 'kevin-tharp-indiana-attorney-partner-riley-bennett-egloff-business-law-construction-law-thumbnail'
    'Laura K. Binford' = 'laura-binford-indianapolis-med-mal-attorney-partner-riley-bennett-egloff-thumbnail-png'
    'Lindsay A. Llewellyn' = 'lindsay-a-llewellyn-thumbnail'
    'Megan S. Young' = 'megan-young-photo-for-thumbnails-jpg'
    'Patrick S. McCarney' = 'patrick-mccarney-indiana-attorney-business-law-insurance-law-thumbnail'
    'Raymond T. Seach' = 'raymond-t-seach-attorney-indianapolis-partner-riley-bennett-egloff'
    'Ryan L. Leitch' = 'ryan-leitch-indiana-attorney-trust-and-estate-law-thumbnail-1'
    'Sarah MacGill Marr' = 'sarah-macgill-marr'
    'Timothy H. Button' = 'timothy-h-button-attorney-indianapolis-thumbnail-image'
    'Anthony R. Jost' = 'tony-jost-2l9a4882'
    'Travis R. Watson' = 'travis-watson-indiana-attorney-construction-law-insurance-law-business-corporate-law-thumbnail'
}

# Mapping: Attorney Name -> Attorney ID
$nameToId = @{
    'Anna K. Marvin' = 'anna-marvin'
    'Anna Marvin' = 'anna-marvin'
    'Beau Browning' = 'beau-browning'
    'Blair R. Vandivier' = 'blair-r-vandivier'
    'Courtney David Mills' = 'courtney-david-mills'
    'Donald S. Smith' = 'donald-s-smith'
    'K. Douglas Cook' = 'k-douglas-cook'
    'Eric M. Hylton' = 'eric-m-hylton'
    'Jaclyn M. Flint' = 'jaclyn-m-flint'
    'James W. Riley Jr.' = 'james-w-riley-jr'
    'Jeffrey B. Fecht' = 'jeffrey-b-fecht'
    'John L. Egloff' = 'john-l-egloff'
    'J.T. Wynne' = 'j-t-wynne'
    'Justin O. Sorrell' = 'justin-o-sorrell'
    'Kathleen Hart' = 'kathleen-hart'
    'Katie R. Osborne' = 'katie-r-osborne'
    'Katie S. Riles' = 'katie-s-riles'
    'Kevin N. Tharp' = 'kevin-n-tharp'
    'Laura K. Binford' = 'laura-k-binford'
    'Lindsay A. Llewellyn' = 'lindsay-a-llewellyn'
    'Megan S. Young' = 'megan-s-young'
    'Patrick S. McCarney' = 'patrick-s-mccarney'
    'Raymond T. Seach' = 'raymond-t-seach'
    'Ryan L. Leitch' = 'ryan-l-leitch'
    'Sarah MacGill Marr' = 'sarah-macgill-marr'
    'Timothy H. Button' = 'timothy-h-button'
    'Anthony R. Jost' = 'anthony-r-jost'
    'Travis R. Watson' = 'travis-r-watson'
}

$optimizedDir = "public\images\team\optimized"
$attorneysDir = "public\images\team\Attorneys"

Write-Host "Starting attorney image normalization..." -ForegroundColor Cyan

$migrated = 0
$deleted = 0
$skipped = 0

foreach ($name in $nameToOptimized.Keys) {
    $optimizedName = $nameToOptimized[$name]
    $attorneyId = $nameToId[$name]

    if (-not $attorneyId) {
        Write-Host "  [SKIP] Skipping $name - no ID mapping found" -ForegroundColor Yellow
        $skipped++
        continue
    }

    $sourceWebp = Join-Path $optimizedDir "$optimizedName.webp"
    $targetWebp = Join-Path $attorneysDir "$attorneyId.webp"

    # Copy .webp file if it exists
    if (Test-Path $sourceWebp) {
        if (-not (Test-Path $targetWebp)) {
            Copy-Item $sourceWebp $targetWebp -Force
            Write-Host "  [OK] Migrated: $attorneyId.webp" -ForegroundColor Green
            $migrated++
        } else {
            Write-Host "  [EXISTS] Already exists: $attorneyId.webp" -ForegroundColor Gray
        }
    } else {
        Write-Host "  [WARN] Source not found: $optimizedName.webp" -ForegroundColor Yellow
        $skipped++
    }

    # Delete .jpg, .png, .avif versions from optimized
    $extensions = @('.jpg', '.png', '.avif')
    foreach ($ext in $extensions) {
        $fileToDelete = Join-Path $optimizedDir "$optimizedName$ext"
        if (Test-Path $fileToDelete) {
            Remove-Item $fileToDelete -Force
            Write-Host "    Deleted: $optimizedName$ext" -ForegroundColor DarkGray
            $deleted++
        }
    }
}

Write-Host "`nMigration Summary:" -ForegroundColor Cyan
Write-Host "  Migrated: $migrated files" -ForegroundColor Green
Write-Host "  Deleted: $deleted duplicate files" -ForegroundColor Yellow
Write-Host "  Skipped: $skipped files" -ForegroundColor Gray
