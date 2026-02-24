// User Profile
export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  role: 'admin' | 'user'
  created_at: string
  updated_at: string
}

// Project
export interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string | null
  cover_image: string | null
  location: string | null
  year: number | null
  category: string | null
  status: 'published' | 'draft'
  sort_order: number
  created_at: string
  updated_at: string
}

// Project Image
export interface ProjectImage {
  id: string
  project_id: string
  image_url: string
  caption: string | null
  sort_order: number
  created_at: string
}

// Article
export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  category: string | null
  tags: string[] | null
  author_id: string
  view_count: number
  status: 'published' | 'draft'
  published_at: string | null
  created_at: string
  updated_at: string
}

// Photo Album
export interface PhotoAlbum {
  id: string
  title: string
  slug: string
  description: string | null
  cover_image: string | null
  sort_order: number
  status: 'published' | 'draft'
  created_at: string
  updated_at: string
}

// Photo
export interface Photo {
  id: string
  album_id: string
  image_url: string
  title: string | null
  description: string | null
  sort_order: number
  created_at: string
}

// Message
export interface Message {
  id: string
  name: string
  email: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  reply: string | null
  replied_at: string | null
  created_at: string
}

// Event
export interface Event {
  id: string
  title: string
  slug: string
  description: string | null
  content: string | null
  cover_image: string | null
  location: string | null
  start_date: string
  end_date: string | null
  max_participants: number | null
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

// Event Signup
export interface EventSignup {
  id: string
  event_id: string
  user_id: string | null
  name: string
  email: string
  phone: string | null
  message: string | null
  status: 'confirmed' | 'cancelled'
  created_at: string
}
