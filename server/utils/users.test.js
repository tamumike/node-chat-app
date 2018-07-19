const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Augie',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    users = new Users();
    var user = {
      id: '123',
      name: 'Michael',
      room: 'Texas'
    };

    var res = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  describe('removeUser', () => {
    it('should remove a user', () => {
      var userId = '1';
      var user = users.removeUser(userId);

      expect(user.id).toBe(userId);
      expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
      var userId = '99';
      var user = users.removeUser(userId);

      expect(user).toNotExist(userId);
      expect(users.users.length).toBe(3);
    });
  });

  describe('getUser', () => {
    it('should find user', () => {
      var userId = '2';
      var user = users.getUser(userId);

      expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
      var userId = '99';
      var user = users.getUser(userId);

      expect(user).toNotExist();
    });
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Augie']);
  });
  it('should return names for react cours', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Jen']);
  });
});
