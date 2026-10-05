/**
 * Seeds the Firestore `employees` collection used by this app.
 * Collections are created when the first document is written.
 *
 * Prerequisites:
 * 1. Cloud Firestore enabled in Firebase Console (project: realtime-emp)
 * 2. Rules allow write (test mode or allow read/write on /employees)
 *
 * Usage: npm run seed
 */

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDg2u34UT3cXvL3I0yg1eN7xuRATYl7YY8',
  authDomain: 'realtime-emp.firebaseapp.com',
  databaseURL: 'https://realtime-emp-default-rtdb.firebaseio.com',
  projectId: 'realtime-emp',
  storageBucket: 'realtime-emp.firebasestorage.app',
  messagingSenderId: '360256559268',
  appId: '1:360256559268:web:e618b527f0578cc86f2e31',
}

const SAMPLE_EMPLOYEES = [
  { name: 'Ada Lovelace', position: 'Engineer', experience: '5 years' },
  { name: 'Alan Turing', position: 'Researcher', experience: '8 years' },
  { name: 'Grace Hopper', position: 'Manager', experience: '12 years' },
]

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function seed() {
  const employeesRef = collection(db, 'employees')
  const existing = await getDocs(employeesRef)

  if (!existing.empty) {
    console.log(
      `Collection "employees" already has ${existing.size} document(s). Skipping seed.`
    )
    console.log('Delete documents in Console (or clear the collection) and re-run to reseed.')
    process.exit(0)
  }

  console.log('Creating collection "employees" with sample documents...')

  for (const employee of SAMPLE_EMPLOYEES) {
    const docRef = await addDoc(employeesRef, {
      ...employee,
      createdAt: serverTimestamp(),
    })
    console.log(`  + ${employee.name} (${docRef.id})`)
  }

  console.log('Done. Open the app and you should see the employees in real time.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err.message || err)
  if (String(err.message || err).includes('permission') || err.code === 'permission-denied') {
    console.error(
      '\nFix: In Firebase Console → Firestore → Rules, allow write while testing, e.g.:\n' +
        '  match /employees/{id} { allow read, write: if true; }\n'
    )
  }
  if (String(err.message || err).includes('NOT_FOUND') || err.code === 'not-found') {
    console.error(
      '\nFix: Create a Firestore database first:\n' +
        '  Firebase Console → Build → Firestore Database → Create database\n'
    )
  }
  process.exit(1)
})
