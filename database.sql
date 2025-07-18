-- Create the snippets table
CREATE TABLE snippets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  code TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE snippets ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (you can modify this later for user-specific access)
CREATE POLICY "Enable read access for all users" ON snippets FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON snippets FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON snippets FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON snippets FOR DELETE USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_snippets_updated_at BEFORE UPDATE
    ON snippets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data
INSERT INTO snippets (title, description, code, tags) VALUES
  ('Hello World JavaScript', 'Basic JavaScript hello world', 'console.log("Hello, World!");', ARRAY['javascript', 'basic']),
  ('Python List Comprehension', 'Create a list with even numbers', 'even_numbers = [x for x in range(10) if x % 2 == 0]', ARRAY['python', 'list-comprehension']),
  ('CSS Flexbox Center', 'Center an element with flexbox', '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}', ARRAY['css', 'flexbox']);
