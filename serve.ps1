# G TRADERS - test the website on this PC (no Python needed)
# Started by "Start-Website.bat". Close this window to stop.
$port = 8000
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css'; '.js'='application/javascript'; '.json'='application/json';
  '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.svg'='image/svg+xml'; '.ico'='image/x-icon'; '.webp'='image/webp';
  '.pdf'='application/pdf'; '.zip'='application/zip'; '.txt'='text/plain; charset=utf-8'; '.md'='text/plain; charset=utf-8' }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$port/")
try { $l.Start() } catch { Write-Host "Port $port is busy. Close the other window first."; Read-Host "Press Enter"; exit }
Write-Host ""
Write-Host "  G TRADERS website is running at  http://localhost:$port" -ForegroundColor Green
Write-Host "  Folder: $root" -ForegroundColor Cyan
Write-Host "  Keep this window open while testing. Close it to stop." -ForegroundColor Yellow
Write-Host ""
Start-Process "http://localhost:$port/index.html"
while ($l.IsListening) {
  $c = $l.GetContext()
  $p = [Uri]::UnescapeDataString($c.Request.Url.AbsolutePath.TrimStart('/'))
  if ($p -eq '') { $p = 'index.html' }
  $f = Join-Path $root $p
  if ((Test-Path $f -PathType Container)) { $f = Join-Path $f 'index.html' }
  if (-not (Test-Path $f -PathType Leaf)) { $f = Join-Path $root '404.html'; $c.Response.StatusCode = 404 }
  $ext = [IO.Path]::GetExtension($f).ToLower()
  $c.Response.Headers.Add('Cache-Control', 'no-store')
  $c.Response.ContentType = $(if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' })
  try { $b = [IO.File]::ReadAllBytes($f); $c.Response.OutputStream.Write($b, 0, $b.Length) } catch {}
  $c.Response.Close()
}
