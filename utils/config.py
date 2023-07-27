from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import base64
import binascii
import os

key = os.environ['ENC_KEY']
SECRET_KEY = binascii.unhexlify(key.encode('utf-8'))
iv = os.environ['ENC_IV']
FIXED_IV = binascii.unhexlify(iv.encode('utf-8'))

def aes_encrypt(data):
    backend = default_backend()
    cipher = Cipher(algorithms.AES(SECRET_KEY), modes.CBC(FIXED_IV), backend=backend)
    encryptor = cipher.encryptor()
    padded_data = data.encode() + b'\x00' * (16 - (len(data) % 16))
    encrypted_data = encryptor.update(padded_data) + encryptor.finalize()
    return base64.urlsafe_b64encode(encrypted_data).decode()

def aes_decrypt(encrypted_data):
    backend = default_backend()
    cipher = Cipher(algorithms.AES(SECRET_KEY), modes.CBC(FIXED_IV), backend=backend)
    decryptor = cipher.decryptor()
    decrypted_data = decryptor.update(base64.urlsafe_b64decode(encrypted_data)) + decryptor.finalize()
    return decrypted_data.rstrip(b'\x00').decode()

