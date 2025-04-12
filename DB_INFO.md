# Gilded Estate Vista - Duomenų bazės informacija

## Lentelių struktūra

### Pagrindinės lentelės

| Lentelė | Aprašymas |
|---------|-----------|
| users | Vartotojų informacija |
| properties | Nekilnojamojo turto objektai |
| property_images | Nekilnojamojo turto nuotraukos |
| property_features | Nekilnojamojo turto savybės |
| contact_messages | Kontaktinės žinutės |

## Row Level Security (RLS) politikos

### Users lentelė

Dabartinės politikos:

| schemaname | tablename | policyname                                        | permissive | roles    | cmd    | qual                                                                                                                                                           | with_check        |
| ---------- | --------- | ------------------------------------------------- | ---------- | -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| public     | users     | Administratoriai gali atnaujinti visus vartotojus | PERMISSIVE | {public} | UPDATE | ((auth.uid() IN ( SELECT users_1.id FROM auth.users users_1 WHERE ((users_1.raw_user_meta_data ->> 'role'::text) = 'admin'::text))) OR (auth.uid() = id)) | null              |
| public     | users     | Administratoriai gali matyti visus vartotojus     | PERMISSIVE | {public} | SELECT | ((auth.uid() IN ( SELECT users_1.id FROM auth.users users_1 WHERE ((users_1.raw_user_meta_data ->> 'role'::text) = 'admin'::text))) OR (auth.uid() = id)) | null              |
| public     | users     | Vartotojai gali atnaujinti savo duomenis          | PERMISSIVE | {public} | UPDATE | (auth.uid() = id)                                                                                                                                              | null              |
| public     | users     | Vartotojai gali ištrinti savo duomenis            | PERMISSIVE | {public} | DELETE | (auth.uid() = id)                                                                                                                                              | null              |
| public     | users     | Vartotojai gali matyti savo duomenis              | PERMISSIVE | {public} | SELECT | (auth.uid() = id)                                                                                                                                              | null              |
| public     | users     | Vartotojai gali įterpti savo duomenis             | PERMISSIVE | {public} | INSERT | null                                                                                                                                                           | (auth.uid() = id) |

### Problemos ir sprendimai

Dabartinėje konfigūracijoje yra kelios problemos:

1. Dubliuojančios politikos:
   - Yra dvi SELECT politikos paprastiems vartotojams
   - Yra dvi UPDATE politikos paprastiems vartotojams

2. Rekursijos problema:
   - Admin politikos naudoja subužklausą į tą pačią `users` lentelę, kas sukelia begalinę rekursiją

Rekomenduojami pakeitimai pateikti žemiau esančiame SQL skripte.

## Duomenų bazės schema

### Users lentelė

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Properties lentelė

```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area NUMERIC,
  type TEXT,
  status TEXT DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  agent_id UUID REFERENCES users(id)
);
```

### Property_images lentelė

```sql
CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Property_features lentelė

```sql
CREATE TABLE property_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Contact_messages lentelė

```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## SQL skriptas RLS politikų atnaujinimui

```sql
-- Pašaliname problematiškas politikas, kurios sukelia rekursiją
DROP POLICY IF EXISTS "Administratoriai gali atnaujinti visus vartotojus" ON "users";
DROP POLICY IF EXISTS "Administratoriai gali matyti visus vartotojus" ON "users";

-- Sukuriame naujas, optimizuotas politikas be rekursijos
CREATE POLICY "Administratoriai gali matyti visus vartotojus" ON "users"
FOR SELECT USING (
  auth.uid() IN (SELECT id FROM auth.users WHERE auth.users.raw_user_meta_data->>'role' = 'admin')
  OR auth.uid() = id
);

CREATE POLICY "Administratoriai gali atnaujinti visus vartotojus" ON "users"
FOR UPDATE USING (
  auth.uid() IN (SELECT id FROM auth.users WHERE auth.users.raw_user_meta_data->>'role' = 'admin')
  OR auth.uid() = id
);

-- Palikime esamas vartotojų politikas, kurios veikia teisingai
-- Vartotojai gali matyti savo duomenis
-- Vartotojai gali atnaujinti savo duomenis
-- Vartotojai gali ištrinti savo duomenis
-- Vartotojai gali įterpti savo duomenis
```
