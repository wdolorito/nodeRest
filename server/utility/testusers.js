// Post:
//
//   owner: {
//   title: {
//   body: {

let master,
    masterdata,
    admin1,
    admin1data,
    admin2,
    admin2data,
    user1,
    user1data,
    user2,
    user2data

master = `{
  "_id": "0add1949-69ee-490b-b5bc-a999a1209862",
  "isMaster": "true",
  "isAdmin": "false",
  "email": "master@ex.com"
}`

masterdata = `{
  "owner": "0add1949-69ee-490b-b5bc-a999a1209862",
  "handle": "TheBoss",
  "firstName": "The",
  "middleName": "Head",
  "lastName": "Honcho",
  "location": "Upstairs office",
  "bio": "I pwn everyone here",
  "avatar": "/some/awesome/path/awesome.png"
}`

admin1 = `{
  "_id": "a19620a8-3cfd-4f9f-8568-75fbf93eddc3",
  "isMaster": "false",
  "isAdmin": "true",
  "email": "admin1@ex.com"
}`

admin1data = `{
  "owner": "a19620a8-3cfd-4f9f-8568-75fbf93eddc3",
  "handle": "Underling1",
  "firstName": "Some",
  "middleName": "Guys",
  "lastName": "Friend",
  "location": "Second floor office",
  "bio": "I just work here",
  "avatar": "/some/path/cute.png"
}`

admin2 = `{
  "_id": "079e495a-972e-498e-81db-fb4d781f31bb",
  "isMaster": "false",
  "isAdmin": "true",
  "email": "admin2@ex.com"
}`

admin2data = `{
  "owner": "079e495a-972e-498e-81db-fb4d781f31bb",
  "handle": "Underling2",
  "firstName": "Guys",
  "middleName": "Other",
  "lastName": "Buddy",
  "location": "Second floor closet",
  "bio": "I know the boss",
  "avatar": "/some/path/llama.png"
}`

user1 = `{
  "_id": "89f06b8d-1296-47c7-98a5-495aee87b351",
  "isMaster": "false",
  "isAdmin": "false",
  "email": "user1@ex.com"
}`

user1data = `{
  "owner": "89f06b8d-1296-47c7-98a5-495aee87b351",
  "handle": "CoolUser",
  "firstName": "Best",
  "middleName": "Nerd",
  "lastName": "Ever",
  "location": "The Basement",
  "bio": "AMA",
  "avatar": "/some/path/glasses.png"
}`

user2 = `{
  "_id": "0efa9e8c-24cc-44d2-84da-ffaaced7ef00",
  "isMaster": "false",
  "isAdmin": "false",
  "email": "user2@ex.com"
}`

user2data = `{
  "owner": "0efa9e8c-24cc-44d2-84da-ffaaced7ef00",
  "handle": "StrongUser",
  "firstName": "Eye",
  "middleName": "Lift",
  "lastName": "Weights",
  "location": "The Gym",
  "bio": "Do you even lift?",
  "avatar": "/some/path/dumbbell.png"
}`

master = JSON.parse(master)
masterdata = JSON.parse(masterdata)
admin1 = JSON.parse(admin1)
admin1data = JSON.parse(admin1data)
admin2 = JSON.parse(admin2)
admin2data = JSON.parse(admin2data)
user1 = JSON.parse(user1)
user1data = JSON.parse(user1data)
user2 = JSON.parse(user2)
user2data = JSON.parse(user2data)

function isAdmin(pass) {
  return new Promise(async (res, rej) => {
    try {
      const user = pass.isAdmin
      res(user)
    } catch(err) {
      rej('db error')
    }
  })
}

function isMaster(pass) {
  return new Promise(async (res, rej) => {
    try {
      const user = pass.isMaster
      res(user)
    } catch(err) {
      rej('db error')
    }
  })
}

async function whoAmI(user) {
  return new Promise(async (res, rej) => {
    try {
      const admin = await isAdmin(user)
      if(admin == 'true') res('admin')
      if(admin == 'false') {
        if(await isMaster(user) == 'true') res('master')
      }
      res('user')
    } catch(err) {
      rej('db error')
    }
  })
}

function canDelete(sent, todel, type, isSame) {
  switch(type) {
    case 'user':
      if(sent === 'master' & !isSame) return true

      if(sent === 'admin') {
        if(todel !== 'master') {
          if(isSame) return true
          if(todel !== 'admin') return true
        }
      }

      return false
      break
    case 'post':
      if(sent === 'master') return true

      if(sent === 'admin') {
        if(todel !== 'master') {
          if(isSame) return true
          if(todel !== 'admin') return true
        }
      }

      return false
      break
    default:
      return false
  }
}

function canUpdate(sent, passed, type, isSame) {
  switch(type) {
    case 'user':
      break
    case 'post':
      break
    default:
      return false
  }
}


async function doChecks(id) {
  let masterid, admin1id, admin2id, user1id, user2id
  masterid = await whoAmI(master)
  admin1id = await whoAmI(admin1)
  admin2id = await whoAmI(admin2)
  user1id = await whoAmI(user1)
  user2id = await whoAmI(user2)

  // console.log('delete user: master + master:', canDelete(masterid, masterid, 'user', true))
  // console.log('delete user: master + admin1', canDelete(masterid, admin1id, 'user', false))
  // console.log('delete user: master + admin2', canDelete(masterid, admin2id, 'user', false))
  // console.log('delete user: master + user1', canDelete(masterid, user1id, 'user', false))
  // console.log('delete user: master + user2', canDelete(masterid, user2id, 'user', false))
  //
  // console.log()
  //
  // console.log('delete post: master + master', canDelete(masterid, masterid, 'post', true))
  // console.log('delete post: master + admin1', canDelete(masterid, admin1id, 'post', false))
  // console.log('delete post: master + admin2', canDelete(masterid, admin2id, 'post', false))
  // console.log('delete post: master + user1', canDelete(masterid, user1id, 'post', false))
  // console.log('delete post: master + user2', canDelete(masterid, user2id, 'post', false))

  // console.log('delete user: admin1 + master:', canDelete(admin1id, masterid, 'user', false))
  // console.log('delete user: admin1 + admin1', canDelete(admin1id, admin1id, 'user', true))
  // console.log('delete user: admin1 + admin2', canDelete(admin1id, admin2id, 'user', false))
  // console.log('delete user: admin1 + user1', canDelete(admin1id, user1id, 'user', false))
  // console.log('delete user: admin1 + user2', canDelete(admin1id, user2id, 'user', false))
  //
  // console.log()
  //
  // console.log('delete post: admin1 + master', canDelete(admin1id, masterid, 'post', false))
  // console.log('delete post: admin1 + admin1', canDelete(admin1id, admin1id, 'post', true))
  // console.log('delete post: admin1 + admin2', canDelete(admin1id, admin2id, 'post', false))
  // console.log('delete post: admin1 + user1', canDelete(admin1id, user1id, 'post', false))
  // console.log('delete post: admin1 + user2', canDelete(admin1id, user2id, 'post', false))

  console.log('delete user: admin2 + master:', canDelete(admin2id, masterid, 'user', false))
  console.log('delete user: admin2 + admin1', canDelete(admin2id, admin1id, 'user', false))
  console.log('delete user: admin2 + admin2', canDelete(admin2id, admin2id, 'user', true))
  console.log('delete user: admin2 + user1', canDelete(admin2id, user1id, 'user', false))
  console.log('delete user: admin2 + user2', canDelete(admin2id, user2id, 'user', false))

  console.log()

  console.log('delete post: admin2 + master', canDelete(admin2id, masterid, 'post', false))
  console.log('delete post: admin2 + admin1', canDelete(admin2id, admin1id, 'post', false))
  console.log('delete post: admin2 + admin2', canDelete(admin2id, admin2id, 'post', true))
  console.log('delete post: admin2 + user1', canDelete(admin2id, user1id, 'post', false))
  console.log('delete post: admin2 + user2', canDelete(admin2id, user2id, 'post', false))
}

doChecks()
