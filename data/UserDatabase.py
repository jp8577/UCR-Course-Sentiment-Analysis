from User import User

class UserDatabase:
    def __init__(self):
        # Initialize an empty dictionary to store users
        self.users = {}

    def add_user(self, user):
        # Check if the user already exists in the database
        if user.user_id in self.users:
            # If so, raise an error to prevent duplicate entries
            raise ValueError(f"User with ID {user.user_id} already exists.")
        # Otherwise, add the new user to the dictionary
        self.users[user.user_id] = user

    def get_user(self, user_id):
        # Retrieve a user by their user_id
        return self.users.get(user_id)
    
    def remove_user(self, user_id):
        # Check if the user_id exists in the database
        if user_id in self.users:
            # If so, delete the user from the dictionary
            del self.users[user_id]
        else:
            # If not found, raise an error to indicate failure
            raise ValueError(f"User with ID {user_id} not found.")
        
    def list_users(self): 
        # Return a list of all user objects stored in the database
        return list(self.users.values())
    
    def find_user_by_email(self, email):
        # Iterate through all users in the database
        for user in self.users.values():
            # Check if the current user's email matches the given email
            if user.email == email:
                # If a match is found, return that user object
                return user
        # Return none if no match is found
        return None
    