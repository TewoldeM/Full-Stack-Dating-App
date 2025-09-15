

## ⚙️ Tech Stack

* **Next.js (App Router)** – Server & client components for fast SSR/SSG
* **Supabase** – Postgres database, auth, RLS, storage & realtime
* [**Stream** – Real-time chat & video/call SDK](https://getstream.io/chat/sdk/react/?utm_source=youtube&utm_medium=referral&utm_content=&utm_campaign=pedro2025)
* **TailwindCSS** – Utility-first styling & responsive layouts
* **TypeScript** – Type-safe codebase
* **Vercel** – Recommended hosting & serverless deployment

---

## ⚡️ Features

* 🔒 **Auth** — Secure sign-up, sign-in, and session handling
* 🧾 **Postgres Schema** — Profiles, matches, messages, calls (RLS-ready)
* 👤 **Profile Page** — View & edit user profile with photos & bio
* 🧪 **Fake Profiles Seeder** — Seed the database for local testing
* ❤️ **Matching System** — Discover, like & match users
* 💬 **Realtime Chat** — One-to-one messaging via Stream
* 🎥 **Live Video Calls** — WebRTC-backed calls using Stream SDK
* 📱 **Responsive UI** — Mobile-first design with Tailwind
* ✅ **Production-ready** — Env config, deployment guide, and seeding scripts


* [Node.js (v18+)](https://nodejs.org/)
* [Supabase account](https://app.supabase.com/)
* [Stream account](https://getstream.io/chat/sdk/react/?utm_source=youtube&utm_medium=referral&utm_content=&utm_campaign=pedro2025)
* [Vercel account](https://vercel.com/) for deployment

### Supabase SQL Command:

```sql
-- =====================================================
-- StreamMatch Dating App - Complete Database Schema
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- TABLES
-- =====================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')) NOT NULL,
    birthdate DATE NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    preferences JSONB DEFAULT '{"age_range": {"min": 18, "max": 50}, "distance": 25, "gender_preference": []}'::jsonb,
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_verified BOOLEAN DEFAULT FALSE,
    is_online BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Likes table
CREATE TABLE public.likes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    from_user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    to_user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(from_user_id, to_user_id)
);

-- Matches table
CREATE TABLE public.matches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user1_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    user2_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user1_id, user2_id)
);

-- =====================================================
-- INDEXES
-- =====================================================

-- Users table indexes
CREATE INDEX idx_users_username ON public.users(username);
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_gender ON public.users(gender);
CREATE INDEX idx_users_birthdate ON public.users(birthdate);
CREATE INDEX idx_users_location ON public.users(location_lat, location_lng);
CREATE INDEX idx_users_last_active ON public.users(last_active);
CREATE INDEX idx_users_created_at ON public.users(created_at);

-- Likes table indexes
CREATE INDEX idx_likes_from_user ON public.likes(from_user_id);
CREATE INDEX idx_likes_to_user ON public.likes(to_user_id);
CREATE INDEX idx_likes_created_at ON public.likes(created_at);

-- Matches table indexes
CREATE INDEX idx_matches_user1 ON public.matches(user1_id);
CREATE INDEX idx_matches_user2 ON public.matches(user2_id);
CREATE INDEX idx_matches_created_at ON public.matches(created_at);

-- =====================================================
-- TRIGGERS & FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users table
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create match when both users like each other
CREATE OR REPLACE FUNCTION create_match_on_mutual_like()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the other user has also liked this user
    IF EXISTS (
        SELECT 1 FROM public.likes 
        WHERE from_user_id = NEW.to_user_id 
        AND to_user_id = NEW.from_user_id
    ) THEN
        -- Create a match (avoid duplicates)
        INSERT INTO public.matches (user1_id, user2_id)
        VALUES (
            LEAST(NEW.from_user_id, NEW.to_user_id),
            GREATEST(NEW.from_user_id, NEW.to_user_id)
        )
        ON CONFLICT (user1_id, user2_id) DO NOTHING;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger for creating matches
CREATE TRIGGER create_match_trigger AFTER INSERT ON public.likes
    FOR EACH ROW EXECUTE FUNCTION create_match_on_mutual_like();

-- Function to update user's last_active timestamp
CREATE OR REPLACE FUNCTION update_last_active()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.users SET last_active = NOW() WHERE id = NEW.from_user_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for updating last_active when user interacts
CREATE TRIGGER update_last_active_trigger AFTER INSERT ON public.likes
    FOR EACH ROW EXECUTE FUNCTION update_last_active();

-- Function to create user profile when user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (
        id,
        full_name,
        username,
        email,
        gender,
        birthdate,
        bio,
        avatar_url,
        preferences
    ) VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1), 'User'),
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1), 'user'),
        NEW.email,
        'other',
        CURRENT_DATE,
        '',
        NULL,
        '{"age_range": {"min": 18, "max": 50}, "distance": 25, "gender_preference": []}'::jsonb
    );
    
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);


-- Likes table policies
CREATE POLICY "Users can view their own likes" ON public.likes
    FOR SELECT USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "Users can create their own likes" ON public.likes
    FOR INSERT WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can delete their own likes" ON public.likes
    FOR DELETE USING (auth.uid() = from_user_id);

-- Matches table policies
CREATE POLICY "Users can view their own matches" ON public.matches
    FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);


```




