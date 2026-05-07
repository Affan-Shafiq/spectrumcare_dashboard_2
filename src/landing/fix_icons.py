import os, glob

path = 'd:/SC/spectrumdash-hub/src/landing/*.tsx'
replaced = 0

# Patterns to find and replace for more prominent icons
# 1. Background color opacity and icon size/color
# We want to change w-10 h-10 to w-12 h-12 and icon from w-5 h-5 to w-6 h-6
# And change icon color to #355070 for better contrast

for file in glob.glob(path):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed = False
    
    # Update Feature/Problem/Game icon containers
    # From: className="w-10 h-10 rounded-xl ... style={{ backgroundColor: `${feature.color}30` }}
    # To:   className="w-12 h-12 rounded-2xl ... style={{ backgroundColor: `${feature.color}20` }}
    if 'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0' in content:
        content = content.replace('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', 'w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0')
        changed = True
    
    if 'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0' in content:
        content = content.replace('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', 'w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0')
        changed = True

    # Update icon size and color
    if 'className="w-5 h-5" style={{ color: feature.color }}' in content:
        content = content.replace('className="w-5 h-5" style={{ color: feature.color }}', 'className="w-6 h-6" style={{ color: "#355070" }}')
        changed = True
    
    if 'className="w-5 h-5" style={{ color: problem.color }}' in content:
        content = content.replace('className="w-5 h-5" style={{ color: problem.color }}', 'className="w-6 h-6" style={{ color: "#355070" }}')
        changed = True

    if 'className="w-5 h-5" style={{ color: game.color }}' in content:
        content = content.replace('className="w-5 h-5" style={{ color: game.color }}', 'className="w-6 h-6" style={{ color: "#355070" }}')
        changed = True

    if 'className="w-6 h-6" style={{ color: user.color }}' in content:
        content = content.replace('className="w-6 h-6" style={{ color: user.color }}', 'className="w-6 h-6" style={{ color: "#355070" }}')
        changed = True

    # Also check Community.tsx which has a slightly different pattern
    if 'className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/60 shadow-sm"' in content:
        # It already has w-12, but check the icon
        pass

    if changed:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        replaced += 1

print(f'Replaced in {replaced} files')
