import { shallowMount } from '@vue/test-utils'
import UserList from '@/components/UserList.vue'
import flushPromises from "flush-promises"
import axios from 'axios'

const data = {
  "results": [
    {
      "gender": "male",
      "name": {
        "title": "Mr",
        "first": "Torgeir",
        "last": "Holand"
      },
      "location": {
        "street": {
          "number": 9554,
          "name": "Vangen"
        },
        "city": "Torpo",
        "state": "Aust-Agder",
        "country": "Norway",
        "postcode": "1275",
        "coordinates": {
          "latitude": "52.7215",
          "longitude": "-86.9565"
        },
        "timezone": {
          "offset": "-3:30",
          "description": "Newfoundland"
        }
      },
      "email": "torgeir.holand@example.com",
      "login": {
        "uuid": "e54fed1b-76fc-41dd-a327-79c46e37c985",
        "username": "blackladybug504",
        "password": "chelsea1",
        "salt": "Cx8Uf2YA",
        "md5": "db19483b8bbf2cee1aeb0c723d6911a1",
        "sha1": "4fc29ae89e4a6889fd8c659d4329c22210966177",
        "sha256": "f1cb6d17f2896139589e68047e32b8fdca8b08631e705c2e387224c451494b86"
      },
      "dob": {
        "date": "1976-12-25T00:57:40.818Z",
        "age": 45
      },
      "registered": {
        "date": "2016-02-07T16:02:25.564Z",
        "age": 5
      },
      "phone": "58147653",
      "cell": "97294036",
      "id": {
        "name": "FN",
        "value": "25127619959"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/27.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/27.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/27.jpg"
      },
      "nat": "NO"
    }
  ],
  "info": {
    "seed": "67bb64feb0bc5caa",
    "results": 1,
    "page": 1,
    "version": "1.3"
  }
}
jest.mock("axios", () => ({
  get: () => Promise.resolve(data)
}));

describe('UserList.vue', () => {
  it("mocking the axios call to get user list", async () => {
    var wrapper = shallowMount(UserList, {});
    expect(axios.get).toHaveBeenCalledWith('https://randomuser.me/api/')
    await flushPromises();
    // expect(wrapper.vm.$data.users.length).toBe(1);
    await expect(axios.get('https://randomuser.me/api/')).resolves.toEqual(data);
  });
});

