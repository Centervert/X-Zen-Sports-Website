-- Generate slugs for all blog posts that don't have one
UPDATE blog_posts
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    ),
    '-+', '-', 'g'
  )
)
WHERE slug IS NULL OR slug = '';

-- Show all posts with their new slugs
SELECT id, title, slug, published FROM blog_posts ORDER BY created_at DESC;
