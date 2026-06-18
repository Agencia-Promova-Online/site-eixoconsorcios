import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { db, storage } from '@/lib/firebase'

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  author: string
  published: boolean
  seoTitle: string
  seoDescription: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export type BlogPostInput = {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  author: string
  published: boolean
  seoTitle: string
  seoDescription: string
}

export const BLOG_CATEGORIES = [
  'Educação Financeira',
  'Consórcio',
  'Mercado',
  'Dicas',
  'Notícias',
  'Institucional',
] as const

export const toSlug = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

const blogsCollection = collection(db, 'blogs')

export async function uploadBlogImage(file: File): Promise<string> {
  const safeName = file.name.replace(/\s+/g, '-').toLowerCase()
  const fileRef = ref(storage, `blogs/${Date.now()}-${safeName}`)
  await uploadBytes(fileRef, file)
  return getDownloadURL(fileRef)
}

export async function deleteBlogImageFromUrl(url: string) {
  if (!url || !url.includes('/o/')) return
  try {
    const storageRef = ref(storage, url)
    await deleteObject(storageRef)
  } catch {
  }
}

export async function listPublishedBlogs(maxItems?: number): Promise<BlogPost[]> {
  const q = query(blogsCollection, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  const posts = snap.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<BlogPost, 'id'>) }))
  const onlyPublished = posts.filter((post) => post.published)
  return maxItems ? onlyPublished.slice(0, maxItems) : onlyPublished
}

export async function listAllBlogs(): Promise<BlogPost[]> {
  const q = query(blogsCollection, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<BlogPost, 'id'>) }))
}

export async function getPublishedBlogBySlug(slug: string): Promise<BlogPost | null> {
  const q = query(blogsCollection, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  const posts = snap.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<BlogPost, 'id'>) }))
  return posts.find((post) => post.slug === slug && post.published) || null
}

export async function createBlogPost(data: BlogPostInput) {
  return addDoc(blogsCollection, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateBlogPost(id: string, data: BlogPostInput) {
  return updateDoc(doc(db, 'blogs', id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function removeBlogPost(id: string) {
  return deleteDoc(doc(db, 'blogs', id))
}
