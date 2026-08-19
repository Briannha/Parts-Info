$ErrorActionPreference = 'Stop'

$musicRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$tracksRoot = Join-Path $musicRoot 'tracks'
$playlistPath = Join-Path $musicRoot 'playlist.json'
$supportedExtensions = @('.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac')

function ConvertTo-WebPath {
    param([Parameter(Mandatory = $true)][string]$Path)

    $normalisedPath = $Path.Replace('\', '/')
    $encodedSegments = @(
        $normalisedPath -split '/' |
            Where-Object { $_ -ne '' } |
            ForEach-Object { [System.Uri]::EscapeDataString($_) }
    )

    return ($encodedSegments -join '/')
}

if (-not (Test-Path -LiteralPath $tracksRoot)) {
    New-Item -ItemType Directory -Path $tracksRoot | Out-Null
}

$audioFiles = @(
    Get-ChildItem -LiteralPath $tracksRoot -File -Recurse |
        Where-Object { $supportedExtensions -contains $_.Extension.ToLowerInvariant() } |
        Sort-Object FullName
)

$tracks = @(
    $audioFiles | ForEach-Object {
        $relativeFile = $_.FullName.Substring($musicRoot.Length).TrimStart([char[]]'\/')
        $relativeFile = ConvertTo-WebPath -Path $relativeFile
        $relativeFolder = $_.Directory.FullName.Substring($tracksRoot.Length).TrimStart([char[]]'\/')
        $artist = ''

        if ($relativeFolder) {
            $artist = ($relativeFolder -split '[\\/]')[0]
        }

        [ordered]@{
            title  = $_.BaseName
            artist = $artist
            file   = $relativeFile
        }
    }
)

$playlist = [ordered]@{
    generatedAt = (Get-Date).ToString('o')
    tracks      = $tracks
}

$json = $playlist | ConvertTo-Json -Depth 5
$utf8WithoutBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($playlistPath, $json, $utf8WithoutBom)

$playlistScriptPath = Join-Path $musicRoot 'playlist.js'
$playlistScript = "window.MG_MUSIC_PLAYLIST = $json;"
[System.IO.File]::WriteAllText($playlistScriptPath, $playlistScript, $utf8WithoutBom)

Write-Host ''
Write-Host "Playlist updated: $playlistPath" -ForegroundColor Green
Write-Host "Offline playlist updated: $playlistScriptPath" -ForegroundColor Green
Write-Host "Tracks found: $($tracks.Count)" -ForegroundColor Cyan
