$port = if ($env:PORT) { $env:PORT } else { 8765 }
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $root) { $root = Get-Location }

try {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://+:${port}/")
    $listener.Start()
    Write-Host "Server started at http://localhost:${port}/"
} catch {
    Write-Host "Failed to bind to port ${port} with +, trying localhost..."
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:${port}/")
    $listener.Start()
    Write-Host "Server started at http://localhost:${port}/"
}

$mime = @{
    '.html' = 'text/html'
    '.js'   = 'application/javascript'
    '.css'  = 'text/css'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.svg'  = 'image/svg+xml'
    '.ico'  = 'image/x-icon'
    '.json' = 'application/json'
}

while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $path = $ctx.Request.Url.LocalPath
    if ($path -eq '/') { $path = '/index.html' }
    $file = Join-Path $root $path.TrimStart('/')
    $resp = $ctx.Response

    if (Test-Path $file -PathType Leaf) {
        $ext = [IO.Path]::GetExtension($file)
        $resp.ContentType = if ($mime[$ext]) { $mime[$ext] } else { 'application/octet-stream' }
        $bytes = [IO.File]::ReadAllBytes($file)
        $resp.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $resp.StatusCode = 404
        $b = [Text.Encoding]::UTF8.GetBytes('Not Found')
        $resp.OutputStream.Write($b, 0, $b.Length)
    }
    $resp.Close()
}
