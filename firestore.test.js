import * as firebaseTesting from '@firebase/rules-unit-testing';
import 'firebase-admin';

describe('Firestore Tests', () => {
  const databaseName = 'test';
  const projectId = 'test';
  const auth = { uid: 'test', email: 'test@google.com' };

  let testApp;
  beforeAll(() => {
    testApp = firebaseTesting.initializeTestApp({
      projectId,
      auth,
      databaseName,
    });
  });

  afterEach(async (done) => {
    await firebaseTesting.clearFirestoreData({ projectId });
    done();
  });

  afterAll(async (done) => {
    await Promise.all(firebaseTesting.apps().map(async (app) => app.delete()));
    done();
  });

  test('new valid counter succeeds', async () => {
    const counter0 = testApp.firestore().collection('counters').doc('0');
    await firebaseTesting.assertSucceeds(counter0.set({ value: 0 }));
  });

  test('new invalid counter fails', async () => {
    const counter0 = testApp.firestore().collection('counters').doc('0');
    await firebaseTesting.assertFails(counter0.set({ value: 1 }));
  });
});
