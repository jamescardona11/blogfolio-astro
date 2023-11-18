import { graphql } from '@octokit/graphql'

import { GITHUB_TOKEN } from '@lib/data/data-sources/remote/remote-constants'
import { siteMetadata } from '@/site-metadata'
import {
  createFailureResponse,
  createSuccessResponse
} from '@/lib/data/core/api_response'
import type { GithubStatsItem } from '@/lib/models/github-stats-item'

export async function getGithubStats() {
  console.log('GET /api/dashboard/wakatime')

  if (GITHUB_TOKEN == null) {
    createFailureResponse('API key is missing', 'UNKNOWN')
  }

  try {
    // @ts-ignore
    const { user } = await graphql(GRAPHQL_STATS_QUERY, {
      login: siteMetadata.github,
      headers: {
        authorization: `bearer ${GITHUB_TOKEN}`
      }
    })

    const stars = user.repositories.nodes.reduce(
      (accumulator: number, repo: { stargazers: { totalCount: number } }) => {
        return accumulator + repo.stargazers.totalCount
      },
      0
    )

    const followers = user.followers.totalCount
    const contributions =
      user.contributionsCollection.contributionCalendar.totalContributions

    return createSuccessResponse({
      followers,
      stars,
      contributions
    } as GithubStatsItem)
  } catch (error) {
    console.error(error)
    return createFailureResponse('Something went wrong with Github', 'UNKNOWN')
  }
}

const GRAPHQL_REPOS_FIELD = `
  repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
    totalCount
    nodes {
      name
      stargazers {
        totalCount
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
`

const GRAPHQL_STATS_QUERY = `
      query userInfo($login: String!) {
        user(login: $login) {
          contributionsCollection {
            totalCommitContributions,
            totalPullRequestReviewContributions
            contributionCalendar {
              totalContributions
            }
          }
          followers {
            totalCount
          }
          ${GRAPHQL_REPOS_FIELD}
        }
      }
    `
