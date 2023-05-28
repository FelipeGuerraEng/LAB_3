# RGB to HSV conversion formula
#LAB3_punto1.py

def rgb_to_hsv(r, g, b):
    # When 0 ≤ R ≤ 255, 0 ≤ G ≤ 255 and 0 ≤ B ≤ 255:
    r_0, g_0, b_0 = r, g, b

    # The R,G,B values are divided by 255 to change the range from 0..255 to 0..1
    r, g, b = r / 255, g / 255, b / 255

    cmax = max(r, g, b)
    cmin = min(r, g, b)

    delta = cmax - cmin

    # Hue calculation:
    if delta == 0:
        h = 0
    elif cmax == r:
        h = ((g - b) / delta) % 6
    elif cmax == g:
        h = (b - r) / delta + 2
    elif cmax == b:
        h = (r - g) / delta + 4

    # Expressed as degrees:
    h = h * 60

    # Saturation calculation:
    if cmax == 0:
        s = 0
    else:
        s = delta / cmax

    # Expressed as a percentage:
    s = s * 100
    v = cmax * 100

    print("RGB({}, {}, {}) a HSV = {}".format(r_0, g_0, b_0, (h, s, v)))


# HSV to RGB conversion formula


def hsv_to_rgb(h, s, v):
    # When 0 ≤ H < 360, 0 ≤ S ≤ 1 and 0 ≤ V ≤ 1:
    c = v * s

    x = c * (1 - abs((h / 60) % 2 - 1))

    m = v - c

    if 0 <= h < 60:
        r, g, b = c, x, 0
    elif 60 <= h < 120:
        r, g, b = x, c, 0
    elif 120 <= h < 180:
        r, g, b = 0, c, x
    elif 180 <= h < 240:
        r, g, b = 0, x, c
    elif 240 <= h < 300:
        r, g, b = x, 0, c
    elif 300 <= h < 360:
        r, g, b = c, 0, x

    r, g, b = round((r + m) * 255), round((g + m) * 255), round((b + m) * 255)

    print("HSV({}, {}, {}) a RGB = {}".format(h, s, v, (r, g, b)))

print("Punto 1 inciso a: ")
rgb_to_hsv(12, 12, 12)
print("\nPunto 1 inciso b: ")
hsv_to_rgb(212, 0.94, 0.78431)


# RGB to HSL conversion formula
def rgb_to_hsl(r, g, b):
    # When 0 ≤ R ≤ 255, 0 ≤ G ≤ 255 and 0 ≤ B ≤ 255:
    r_0, g_0, b_0 = r, g, b

    # The R,G,B values are divided by 255 to change the range from 0..255 to 0..1
    r, g, b = r / 255, g / 255, b / 255

    cmax = max(r, g, b)
    cmin = min(r, g, b)

    delta = cmax - cmin

    # Hue calculation:
    if delta == 0:
        h = 0
    elif cmax == r:
        h = ((g - b) / delta) % 6
    elif cmax == g:
        h = (b - r) / delta + 2
    elif cmax == b:
        h = (r - g) / delta + 4

    # Expressed as degrees:
    h = h * 60

    # Lightness calculation:
    l = (cmax + cmin) / 2

    # Saturation calculation:
    if delta == 0:
        s = 0
    else:
        s = delta / (1 - abs((2 * l) - 1))

    # Expressed as a percentage:
    s = s * 100
    l = l * 100

    print("RGB({}, {}, {}) a HSL = {}".format(r_0, g_0, b_0, (h, s, l)))




# HSL to RGB conversion formula
def hsl_to_rgb(h, s, l):
    # When 0 ≤ H < 360, 0 ≤ S ≤ 1 and 0 ≤ L ≤ 1:
    c = (1 - abs((2 * l) - 1)) * s

    x = c * (1 - abs((h / 60) % 2 - 1))

    m = l - c / 2

    if 0 <= h < 60:
        r, g, b = c, x, 0
    elif 60 <= h < 120:
        r, g, b = x, c, 0
    elif 120 <= h < 180:
        r, g, b = 0, c, x
    elif 180 <= h < 240:
        r, g, b = 0, x, c
    elif 240 <= h < 300:
        r, g, b = x, 0, c
    elif 300 <= h < 360:
        r, g, b = c, 0, x

    r, g, b = round((r + m) * 255), round((g + m) * 255), round((b + m) * 255)

    print("HSL({}, {}, {}) a RGB = {}".format(h, s, l, (r, g, b)))


print("\nPunto 2 inciso a: ")
rgb_to_hsl(160, 255, 50)
print("\nPunto 2 inciso b: ")
hsl_to_rgb(88, 0.5980, 1)


# RGB to CMY conversion formula
def rgb_to_cmy(r, g, b):
    # The R,G,B values are divided by 255 to change the range from 0..255 to 0..1
    c = 1 - (r / 255)
    m = 1 - (g / 255)
    y = 1 - (b / 255)

    print("RGB({}, {}, {}) a CMY = {}".format(r, g, b, (c, m, y)))




# CMY to RGB conversion formula
def cmy_to_rgb(c, m, y):
    # When 0 ≤ C ≤ 1, 0 ≤ M ≤ 1 and 0 ≤ Y ≤ 1:
    r = round(255 * (1 - c))
    g = round(255 * (1 - m))
    b = round(255 * (1 - y))

    print("CMY({}, {}, {}) a RGB = {}".format(c, m, y, (r, g, b)))

print("\nPunto 3 inciso a: ")
rgb_to_cmy(80, 35, 98)
print("\nPunto 3 inciso b: ")
cmy_to_rgb(0.3529, 0.8039, 0.5294)


