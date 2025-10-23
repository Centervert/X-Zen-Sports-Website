-- Update the martial arts blog post slug to match the exact URL
UPDATE blog_posts
SET slug = 'why-training-martial-arts-might-be-the-best-decision-you-ever-make'
WHERE title LIKE '%Why Training Martial Arts%'
  OR slug LIKE 'why-training-martial-arts%';

-- Verify the update
SELECT id, title, slug, published
FROM blog_posts
WHERE slug = 'why-training-martial-arts-might-be-the-best-decision-you-ever-make';
