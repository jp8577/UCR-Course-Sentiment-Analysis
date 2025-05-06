
class User:
    def __init__(self, user_id, email, password, name, is_admin=False):
        self.__user_id = user_id
        self.__email = email
        self.__password = password
        self.__name = name
        self.__is_admin = is_admin
        self.is_logged_in = False

    def login(self, input_email, input_password):
        if input_email == self.__email and input_password == self.__password:
            self.is_logged_in = True
            print(f"{self.__name} has logged in.")
            return True
        else:
            print("Invalid email or password.")
            return False

    def logout(self):
        if self.is_logged_in:
            self.is_logged_in = False
            print(f"{self.__name} has logged out.")
        else:
            print("User is not logged in.")

    def get_user_id(self):
        return self.__user_id
    
    def get_email(self):
        return self.__email
    
    def get_name(self):
        return self.__name
    
    def is_admin_user(self):
        return self.__is_admin
    
    