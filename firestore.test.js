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
    const counter = testApp.firestore().collection('counters').doc('0');
    await firebaseTesting.assertSucceeds(counter.set({ value: 0 }));
  });

  test('new invalid counter fails', async () => {
    const counter = testApp.firestore().collection('counters').doc('0');
    await firebaseTesting.assertFails(counter.set({ value: 1 }));
  });

  test('increment valid counter succeeds', async () => {
    const counter = testApp.firestore().collection('counters').doc('0');
    await firebaseTesting.assertSucceeds(counter.set({ value: 0 }));
    await firebaseTesting.assertSucceeds(counter.set({ value: 1 }));
  });
});
