# Function that convert either farenheit to celsius or celsius to farenheit

def convert_temperature(temp, unit):
    if unit == 'C':
        return (temp - 32) * 5 / 9
    elif unit == 'F':
        return (temp * 9 / 5) + 32
    else:
        return "Invalid unit"