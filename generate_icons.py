from PIL import Image
import os

# Source image
src = 'frontend/public/icon.jpg'

# Android icon sizes and destinations
android_icons = [
    (48, 'frontend/android/app/src/main/res/mipmap-mdpi/ic_launcher.png'),
    (72, 'frontend/android/app/src/main/res/mipmap-hdpi/ic_launcher.png'),
    (96, 'frontend/android/app/src/main/res/mipmap-xhdpi/ic_launcher.png'),
    (144, 'frontend/android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png'),
    (192, 'frontend/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png'),
]

# PWA icon sizes and destinations
pwa_icons = [
    (192, 'frontend/public/icon-192x192.png'),
    (512, 'frontend/public/icon-512x512.png'),
]

img = Image.open(src).convert('RGBA')

# Android icons
def save_icons(icon_list):
    for size, path in icon_list:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        img.resize((size, size), Image.LANCZOS).save(path)
        print(f'Generated {path}')

save_icons(android_icons)
save_icons(pwa_icons)
print('All icons generated!') 