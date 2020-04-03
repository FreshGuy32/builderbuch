$packageRaw = Get-Content -Path ./package.json | Out-String

$package = ConvertFrom-Json $packageRaw

$peerDeps = $package.peerDependencies

$depsWithVersion = $peerDeps.PSObject.Properties | ForEach-Object {
    "$($_.Name)@$($_.Value)"
}

$allDeps = $depsWithVersion -join ' '

Invoke-Expression "yarn add --peer --pure-lockfile $allDeps"