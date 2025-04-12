
# GildedEstate Database Schema Documentation

This document outlines the database schema for the GildedEstate luxury real estate application. The database is implemented using Supabase.

## Tables

### 1. `users`

This table extends the default Supabase auth.users table with additional user profile information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key, references auth.users.id |
| email | text | User's email address |
| full_name | text | User's full name |
| avatar_url | text | URL to user's profile image |
| phone_number | text | User's contact number |
| role | text | User role: 'admin', 'agent', or 'user' |
| created_at | timestamp | Account creation timestamp |

### 2. `properties`

Stores information about the luxury properties.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Property title |
| description | text | Detailed property description |
| price | numeric | Property price |
| address | text | Property address |
| city | text | City location |
| state | text | State/province |
| country | text | Country |
| zip_code | text | Postal/ZIP code |
| latitude | numeric | Geographical latitude |
| longitude | numeric | Geographical longitude |
| bedrooms | integer | Number of bedrooms |
| bathrooms | numeric | Number of bathrooms |
| square_feet | integer | Property size in square feet |
| lot_size | numeric | Lot size |
| year_built | integer | Year the property was built |
| property_type | text | Type: 'house', 'condo', 'penthouse', 'villa', etc. |
| status | text | 'active', 'pending', 'sold', 'for_rent' |
| featured | boolean | Whether the property is featured |
| created_at | timestamp | Listing creation date |
| updated_at | timestamp | Last update timestamp |
| agent_id | uuid | References users.id of the listing agent |

### 3. `property_images`

Stores images for each property.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| property_id | uuid | References properties.id |
| url | text | Image URL in storage |
| is_primary | boolean | Whether this is the main image |
| caption | text | Optional image caption |
| created_at | timestamp | Upload timestamp |

### 4. `property_features`

Stores features/amenities for each property.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| property_id | uuid | References properties.id |
| feature | text | Feature name |
| created_at | timestamp | Creation timestamp |

### 5. `comments`

Stores user comments on properties.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| property_id | uuid | References properties.id |
| user_id | uuid | References users.id |
| parent_id | uuid | References comments.id for nested comments |
| content | text | Comment text |
| created_at | timestamp | Comment timestamp |
| updated_at | timestamp | Last edit timestamp |
| status | text | 'published', 'pending', 'rejected' |

### 6. `likes`

Stores user likes on properties and images.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | References users.id |
| property_id | uuid | References properties.id |
| image_id | uuid | References property_images.id |
| created_at | timestamp | Like timestamp |

### 7. `favorites`

Stores user favorite properties.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | References users.id |
| property_id | uuid | References properties.id |
| created_at | timestamp | Timestamp when favorited |

### 8. `contact_messages`

Stores contact form submissions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Sender's name |
| email | text | Sender's email |
| phone | text | Sender's phone number |
| message | text | Message content |
| property_id | uuid | Optional reference to properties.id |
| created_at | timestamp | Submission timestamp |
| status | text | 'new', 'in_progress', 'resolved' |
| assigned_to | uuid | References users.id of staff member |

## Row Level Security Policies

The following RLS policies are implemented to secure the database:

### Properties Table

- Anyone can read published properties
- Only admins and agents can create new properties
- Only admins and the agent who created a property can update it
- Only admins can delete properties

### Comments Table

- Anyone can read published comments
- Authenticated users can create comments
- Users can edit their own comments
- Only admins can moderate (approve/reject) comments
- Users can delete their own comments, admins can delete any comment

### Users Table

- Users can read their own profile
- Admins can read all profiles
- Users can update their own profile
- Only admins can update roles or delete users

## Database Indexes

The following indexes are created to optimize query performance:

- properties(status, featured)
- properties(city, state, country)
- properties(property_type)
- property_images(property_id)
- comments(property_id)
- comments(user_id)
- likes(property_id)
- likes(user_id)
- favorites(user_id)

## Notes for Implementation

1. Connect Supabase Auth for user authentication
2. Set up storage buckets for property images and user avatars
3. Implement database functions for:
   - Property search with filtering
   - Comment moderation workflow
   - User role management
   - Property statistics (views, likes, etc.)
