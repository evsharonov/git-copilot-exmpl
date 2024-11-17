def write_file(filename, content):
    with open(filename, 'w') as f:
        f.write(content)

def read_file(filename):
    with open(filename, 'r') as f:
        return f.read()

def write_file_with_mode(filename, content, mode):
    with open(filename, mode) as f:
        f.write(content)

def read_file_with_mode(filename, mode):
    with open(filename, mode) as f:
        return f.read()
    
def write_file_with_mode_and_encoding(filename, content, mode, encoding):
    with open(filename, mode, encoding=encoding) as f:
        f.write(content)

def read_file_with_mode_and_encoding(filename, mode, encoding):
    with open(filename, mode, encoding=encoding) as f:
        return f.read() 

def write_file_with_mode_and_encoding_and_errors(filename, content, mode, encoding, errors):
    with open(filename, mode, encoding=encoding, errors=errors) as f:
        f.write(content)   