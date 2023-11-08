import fs from "node:fs";

const controller = {
  get: (req, res) => {

    const userId = req.params.id;
    fs.readFile("src/store/users.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      }
      const users = JSON.parse(data);
      if (userId) {
        
        const user = users.find((user) => user.Id === parseInt(userId));

        if (user) {
          return res.status(200).json({ user: user });
        } else {
          return res.status(404).json({ message: 'User not found' });
        }
      } else {
        
        return res.status(200).json({ users: users });
      } 
      

    });
  },
  post: (req, res) => {
    const { username, password, fullname } = req.body;

    if (!username || !password || !fullname) {
      return res
        .status(400)
        .json({ message: "Username/Password/Fullname is required" });
    }

    fs.readFile("src/store/users.json", "utf-8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      const users = JSON.parse(data);
      const user = {
        Id: users.length,
        Fullname: fullname,
        Username: username,
        Password: password,
      };
      const updateData = [...users, user];
      fs.writeFile(
        "src/store/users.json",
        JSON.stringify(updateData),
        (err) => {
          if (err) {
            console.log(err);n
            return res.status(500).json({ message: err.message });
          } else {
            return res
              .status(200)
              .json({ message: "New user added succesfully." });
          }
        },
      );
    });
  },
  put: (req, res) => {
    const userId = req.params.id;
    const { username, password, fullname } = req.body;

    if (!username || !password || !fullname) {
      return res.status(400).json({ message: 'Username, password, and fullname are required' });
    }

    fs.readFile('src/store/users.json', 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const users = JSON.parse(data);
      const userToUpdate = users.find((user) => user.Id === parseInt(userId));

      if (userToUpdate) {
   
        userToUpdate.Username = username;
        userToUpdate.Password = password;
        userToUpdate.Fullname = fullname;

   
        fs.writeFile('src/store/users.json', JSON.stringify(users), (err) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          } else {
            return res.status(200).json({ message: 'User updated successfully' });
          }
        });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    });
  },




  delete: (req, res) => {
    const userId = req.params.id;

    
    

    fs.readFile('src/store/users.json', 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const users = JSON.parse(data);

      const updatedUsers = users.filter((user) => user.Id !== parseInt(userId));

      if (updatedUsers.length < users.length) {
        
        fs.writeFile('src/store/users.json', JSON.stringify(updatedUsers), (err) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          } else {
            return res.status(200).json({ message: 'User deleted successfully' });
          }
        });
      } else {
        return res.status(404).json({ message: 'User not found' });
      } 
    });
  },
};

export default controller;

