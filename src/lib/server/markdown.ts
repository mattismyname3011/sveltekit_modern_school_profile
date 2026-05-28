/**
 * Content sanitization.
 *
 * News post bodies are stored as HTML (produced by the WYSIWYG editor in
 * /admin/news/*). We sanitize twice:
 *
 *   - On save (admin) — strip <script>, dangerous attrs, suspicious schemes.
 *   - On render (public) — defense in depth. If the DB ever ends up with
 *     unsafe HTML for any reason, it still won't reach the client.
 *
 * Allowed tag/attribute set is intentionally narrow.
 */
import sanitizeHtml from 'sanitize-html';

const SANITIZE_OPTS: sanitizeHtml.IOptions = {
	allowedTags: [
		'p', 'br', 'hr',
		'strong', 'em', 'u', 's', 'b', 'i', 'code', 'pre', 'blockquote',
		'ul', 'ol', 'li',
		'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
		'a',
		'img', 'figure', 'figcaption',
		'table', 'thead', 'tbody', 'tr', 'th', 'td',
		'div', 'span'
	],
	allowedAttributes: {
		a: ['href', 'title', 'target', 'rel'],
		img: ['src', 'alt', 'title', 'loading', 'width', 'height'],
		figure: ['class'],
		'*': []
	},
	allowedSchemes: ['http', 'https', 'mailto'],
	allowedSchemesByTag: { img: ['http', 'https', 'data'] },
	transformTags: {
		// Force every external link to open safely.
		a: (tagName, attribs) => ({
			tagName,
			attribs: {
				...attribs,
				rel: 'noopener noreferrer',
				target: attribs.href?.startsWith('http') ? '_blank' : '_self'
			}
		}),
		// Always lazy-load images and fall back to safe alt.
		img: (tagName, attribs) => ({
			tagName,
			attribs: {
				...attribs,
				alt: attribs.alt ?? '',
				loading: 'lazy'
			}
		})
	}
};

/**
 * Sanitize a stored HTML content string for safe public output.
 * Returns an empty string for null/undefined input.
 */
export function renderContent(html: string | null | undefined): string {
	if (!html) return '';
	return sanitizeHtml(html, SANITIZE_OPTS);
}

/**
 * Sanitize HTML received from the dashboard editor before storing.
 */
export function sanitizeForStorage(html: string): string {
	return sanitizeHtml(html, SANITIZE_OPTS);
}
