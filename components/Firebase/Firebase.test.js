import Firebase from "./Firebase";
import * as firebase from 'firebase'

describe("Firebase", () => {

  it('should save poop data', () => {
    const mockSet = jest.fn()
    firebase.auth = jest.fn().mockReturnValue(
      {
        currentUser: {
          salary: 20.0
        }
      })
    firebase.database = () => {
      return {
        ref: () => {
          return {
            push: () => {
              return {
                set: mockSet
              }
            }
          }
        }
      }
    }
    Firebase.savePoop({hi: "yo"})

    expect(firebase.auth).toHaveBeenCalled()
    expect(mockSet).toHaveBeenCalledWith({hi: "yo"})
  });

});