-- Check all blog posts and their slugs
SELECT id, title, slug, published, created_at 
FROM blog_posts 
ORDER BY created_at DESC;

-- Update any posts that don't have slugs
UPDATE blog_posts
SET slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'))
WHERE slug IS NULL OR slug = '';
